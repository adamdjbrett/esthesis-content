import { DateTime } from "luxon";
import { readFileSync } from "fs";
import markdownIt from "markdown-it";
import markdownItFootnote from "markdown-it-footnote";
import toc from "eleventy-plugin-toc";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(toc);

  const md = markdownIt({ html: true, linkify: true });
  md.use(markdownItFootnote);
  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addPassthroughCopy({ "public/css": "css" });
  eleventyConfig.addPassthroughCopy({ "public/images": "images" });
  eleventyConfig.addPassthroughCopy({ "public/docs": "docs" });
  eleventyConfig.addPassthroughCopy({
    "node_modules/pagefind/pagefind-ui.js": "pagefind/pagefind-ui.js",
  });
  eleventyConfig.addPassthroughCopy({
    "node_modules/pagefind/pagefind-ui.css": "pagefind/pagefind-ui.css",
  });
  eleventyConfig.addPassthroughCopy({
    "node_modules/@zachleat/heading-anchors/heading-anchors.js": "js/heading-anchors.js"
  });

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("dd LLLL yyyy");
  });

  eleventyConfig.addFilter("date", (dateObj, format) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(format);
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-MM-dd");
  });

  eleventyConfig.addFilter("dateFilter", (dateObj, format) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(format);
  });

  eleventyConfig.addFilter("isoDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toISO();
  });

  eleventyConfig.addFilter("urlencode", (value) => {
    return encodeURIComponent(value);
  });

  eleventyConfig.addFilter("displayName", (value) => {
    if (!value) return "";
    return value
      .toString()
      .replace(/-/g, " ")
      .split(/\s+/)
      .map((word) =>
        word ? word[0].toUpperCase() + word.slice(1).toLowerCase() : word
      )
      .join(" ");
  });

  eleventyConfig.addFilter("baseUrl", (url) => {
    if (!url || url === "/") {
      return "http://localhost:8080";
    }
    return url.endsWith("/") ? url.slice(0, -1) : url;
  });

  eleventyConfig.addFilter("absUrl", (path, base) => {
    try {
      return new URL(path, base).toString();
    } catch {
      return path;
    }
  });

  eleventyConfig.addFilter("limit", (array, limit) => {
    return array.slice(0, limit);
  });

  eleventyConfig.addFilter("filterByCategory", (posts, category) => {
    return posts.filter((post) => {
      return post.data.categories && post.data.categories.includes(category);
    });
  });

  eleventyConfig.addFilter("filterByTag", (posts, tag) => {
    return posts.filter((post) => {
      return post.data.tags && post.data.tags.includes(tag);
    });
  });

  eleventyConfig.addFilter("filterByTagSafe", (posts, tag) => {
    if (!tag) return posts;
    return posts.filter((post) => {
      return post.data.tags && post.data.tags.includes(tag);
    });
  });

  eleventyConfig.addFilter("filterByAuthor", (posts, author) => {
    return posts.filter((post) => {
      return post.data.author === author;
    });
  });

  eleventyConfig.addFilter("breadcrumbs", (dateObj, title, metadata) => {
    if (!dateObj || !title) return [];
    const dt = DateTime.fromJSDate(dateObj, { zone: "utc" });
    return [
      { text: metadata?.title || "The New Polis", url: "/" },
      { text: dt.toFormat("yyyy"), url: `/${dt.toFormat("yyyy")}/` },
      { text: dt.toFormat("MMMM"), url: `/${dt.toFormat("yyyy")}/${dt.toFormat("MM")}/` },
      { text: dt.toFormat("dd"), url: `/${dt.toFormat("yyyy")}/${dt.toFormat("MM")}/${dt.toFormat("dd")}/` },
      { text: title, url: null },
    ];
  });

  const getPosts = (collectionApi) =>
    collectionApi.getFilteredByGlob("content/posts/**/*.md").reverse();

  eleventyConfig.addCollection("posts", (collectionApi) => {
    return getPosts(collectionApi);
  });

  eleventyConfig.addCollection("conferences", (collectionApi) => {
    return collectionApi.getFilteredByGlob("content/conferences/**/*.md").reverse();
  });

  eleventyConfig.addCollection("contributors", (collectionApi) => {
    return collectionApi.getFilteredByGlob("content/contributor/*.md").sort((a, b) => {
      const nameA = (a.data.title || "").toLowerCase();
      const nameB = (b.data.title || "").toLowerCase();
      return nameA.localeCompare(nameB);
    });
  });

  eleventyConfig.addFilter("postsNamedForContributor", (posts, name) => {
    if (!posts || !name) return [];
    const nameLower = name.toLowerCase();
    const nameParts = nameLower
      .replace(/["“”]/g, "")
      .replace(/\(.*?\)/g, "")
      .split(/\s+/)
      .filter(Boolean);
    const lastName = nameParts[nameParts.length - 1];
    const shortName = nameParts.length > 1 ? `${nameParts[0]} ${lastName}` : nameLower;

    return posts.filter((post) => {
      const title = (post?.data?.title || "").toLowerCase();
      const author = (post?.data?.author || "").toLowerCase();
      return (
        author === nameLower ||
        author === shortName ||
        title.includes(nameLower) ||
        title.includes(shortName) ||
        (lastName && title.includes(lastName))
      );
    });
  });

  eleventyConfig.addCollection("categories", function (collectionApi) {
    let categories = new Set();
    getPosts(collectionApi).forEach((item) => {
      if (item.data.categories) {
        item.data.categories.forEach((cat) => categories.add(cat));
      }
    });
    return Array.from(categories).sort();
  });

  eleventyConfig.addCollection("tags", function (collectionApi) {
    let tags = new Set();
    getPosts(collectionApi).forEach((item) => {
      if (item.data.tags) {
        item.data.tags.forEach((tag) => tags.add(tag));
      }
    });
    return Array.from(tags).sort();
  });

  eleventyConfig.addCollection("authors", function (collectionApi) {
    let authors = new Set();
    getPosts(collectionApi).forEach((item) => {
      if (item.data.author) {
        authors.add(item.data.author);
      }
    });
    return Array.from(authors).sort();
  });

  eleventyConfig.addCollection("authorPages", function (collectionApi) {
    const authorsJson = readFileSync("./_data/authors.json", "utf-8");
    const authorsData = JSON.parse(authorsJson);
    let posts = getPosts(collectionApi);
    let authorPages = [];

    Object.entries(authorsData).forEach(([key, author]) => {
      let authorPosts = posts.filter((post) => post.data.author === key);
      if (authorPosts.length > 0) {
        authorPages.push({
          key: key,
          name: author.name,
          bio: author.bio,
          posts: authorPosts,
          url: `/author/${key}/`,
        });
      }
    });

    return authorPages;
  });

  return {
    dir: {
      input: "content",
      output: "_site",
      includes: "../_includes",
      data: "../_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
