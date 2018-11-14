const html = require("html-template-tag"); //double $$ let you interpolate values without escaping
const layout = require("./layout");
const marked = require('marked'); //adding Markdown support "npm install marked"


module.exports = (page, author) => layout(html`
  <h3>${page.title}
      <small> (<a href="/wiki/${page.slug}/similar">Similar</a>)</small>
  </h3>
  <h4>by <a href="/users/${author.id}">${author.name}</a></h4>
  <hr/>
  <div class="page-body">$${marked(page.content)}</div>
  <hr/>
  <a href="/wiki/${page.slug}/edit" class="btn btn-primary">edit this page</a>
  <a href="/wiki/${page.slug}/delete" class="btn btn-danger">delete this page</a>
`);

//${} using this called html tagged templated literal library "html-template-tag" will help automatically escape any html from variables
