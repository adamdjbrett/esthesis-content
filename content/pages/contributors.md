---
title: "Contributors"
description: "Meet the Esthesis contributors: scholars, artists, and cultural critics whose interdisciplinary work spans literature, philosophy, theology, media, and art."
permalink: /contributors/
---

{% for contributor in collections.contributors %}
## [{{ contributor.data.title }}]({{ contributor.url }})

{% if contributor.data.image %}
![{{ contributor.data.title }}]({{ contributor.data.image }})
{% endif %}

{{ contributor.templateContent | safe }}

{% endfor %}
