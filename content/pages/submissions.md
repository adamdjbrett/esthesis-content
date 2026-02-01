---
title: "Submissions"
description: "Submit articles to Esthesis using this form with your name, subject, email, website, message, and short bio so the editors can review your work for publication."
permalink: /submissions/
layout: form.njk
---

If you have an article you would like considered for Esthesis, please fill out and submit the following form:

<form class="submission-form" method="post" action="#">
  <p>
    <label for="name">Name</label><br>
    <input id="name" name="name" type="text" required>
  </p>
  <p>
    <label for="subject">Subject</label><br>
    <input id="subject" name="subject" type="text" required>
  </p>
  <p>
    <label for="email">Email</label><br>
    <input id="email" name="email" type="email" required>
  </p>
  <p>
    <label for="website">Website</label><br>
    <input id="website" name="website" type="url">
  </p>
  <p>
    <label for="message">Message</label><br>
    <textarea id="message" name="message" rows="6" required></textarea>
  </p>
  <p>
    <label for="bio">Short Bio</label><br>
    <textarea id="bio" name="bio" rows="4" required></textarea>
  </p>
  <p>
    <button type="submit">Submit</button>
  </p>
</form>
