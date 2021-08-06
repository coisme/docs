import * as fs from "fs-extra";
import fg from "fast-glob";
import mkdirp from "mkdirp";
import {createHash, randomBytes} from "crypto";
import {isProductRoot} from "../src/utils/getLocalDirectory";

const hash = function(str: string) {
  return createHash("md5")
    .update(str)
    .digest("hex");
};

const replacer1 = function(_1, p1: string, p2: string, _2, _3) {
  const salt = randomBytes(1).toString("hex");
  return `\n\nimport all${hash(p1 + p2) +
    salt} from "/src/fragments/${p1}${p2}x";\n
<Fragments fragments={{all: all${hash(p1 + p2) + salt}}} />`;
};

const replacer2 = function(_1, p1: string, p2: string, p3: string, _2, _3) {
  const salt = randomBytes(1).toString("hex");
  return `\n\nimport ${p1 +
    hash(p2 + p3) +
    salt} from "/src/fragments/${p2}${p3}x";\n
<Fragments fragments={{${p1}: ${p1 + hash(p2 + p3) + salt}}} />`;
};

const grab = function() {
  for (const chunk of fg.sync("docs/**/*.md", {
    cwd: "./",
  })) {
    let toWrite = "";
    let destination = chunk.slice(5); // slice off docs/
    let file = fs.readFileSync(chunk).toString();
    if (chunk.includes("fragments")) {
      destination = destination.split("fragments").join("");
      destination = "src/fragments/" + destination + "x";
    } else {
      const frontMatter = file.split("---")[1].split("\n");
      file = file.split("---")[2];
      let filterKey = "";
      toWrite += "export const meta = {\n";
      for (const line of frontMatter) {
        const [key, value] = line.split(": ");
        if (typeof key === "undefined" || typeof value === "undefined")
          continue;
        if (key === "filterKey") filterKey = value;
        toWrite += `  ${key}: "${value}",\n`;
      }

      destination = destination.slice(0, -3); // slice off .md
      if (filterKey === "") {
        if (destination.includes("start/")) {
          filterKey = "integration";
        } else if (destination.includes("lib/")) {
          filterKey = "platform";
        } else if (destination.includes("sdk/")) {
          filterKey = "platform";
        } else if (destination.includes("ui/")) {
          filterKey = "framework";
        } else if (destination.includes("guides/")) {
          filterKey = "platform";
        } else {
          // /cli/ and /console/
          destination = "src/pages/" + destination + ".mdx";
        }
      }
      toWrite += "};\n\n";

      try {
        if (isProductRoot(destination)) {
          // lib/lib -> just lib
          destination = destination.split("/")[0];
        }
      } catch {}

      if (filterKey !== "") {
        destination =
          "src/pages/" + destination + `/q/${filterKey}/[${filterKey}].mdx`;
      }
    }

    // inline-fragment -> Fragments
    // <inline-fragment src="~/{1}/fragments{2}"></inline-fragment> ->
    //   import all from "/src/fragments/{1}{2}x";
    //   <Fragments fragments={all: all} />
    // file = file.replace(
    //   /<inline-fragment src="~\/(.*?)fragments\/(.*?)"><\/inline-fragment>/g,
    //   replacer1,
    // );

    while (
      file.search(
        /<inline-fragment src="~\/(.*?)fragments\/(.*?)"><\/inline-fragment>/,
      ) > -1
    ) {
      file = file.replace(
        /<inline-fragment src="~\/(.*?)fragments\/(.*?)"><\/inline-fragment>/,
        replacer1,
      );
    }

    // <inline-fragment platform/integration="{1}" src="~/{2}/fragments{3}"></inline-fragment> ->
    //   import {1} from "/src/fragments/{2}{3}x";
    //   <Fragments fragments={{1}: {1}} />
    file = file.replace(
      /<inline-fragment .*?="(.*?)" src="~\/(.*?)fragments\/(.*?)"><\/inline-fragment>/g,
      replacer2,
    );

    while (
      file.search(
        /<inline-fragment .*?="(.*?)" src="~\/(.*?)fragments\/(.*?)"><\/inline-fragment>/,
      ) > -1
    ) {
      file = file.replace(
        /<inline-fragment .*?="(.*?)" src="~\/(.*?)fragments\/(.*?)"><\/inline-fragment>/,
        replacer2,
      );
    }

    // amplify-block + amplify-block-switcher -> CodeBlock + BlockSwitcher
    file = file.split("amplify-block-switcher").join("BlockSwitcher");
    file = file.split("amplify-block").join("CodeBlock");

    // amplify-callout -> Callout
    file = file.split("amplify-callout").join("Callout");

    // amplify-responsive-grid -> Grid
    file = file.split("amplify-responsive-grid").join("Grid");

    // docs-card -> Card
    file = file.split("docs-card").join("Card");

    // docs-internal-link-button -> InternalLinkButton
    file = file.split("docs-internal-link-button").join("InternalLinkButton");

    // docs-hero -> Hero
    file = file.split("docs-hero").join("Hero");

    // docs-footer -> Footer
    file = file.split("docs-footer").join("Footer");

    // docs-container -> Container
    file = file.split("docs-container").join("Container");

    // docs-filter -> FilterContent
    file = file.split("docs-filter").join("FilterContent");

    // links
    file = file.split("(~").join("(");
    file = file.split(".md)").join(")");

    try {
      mkdirp.sync(
        destination
          .split("/")
          .slice(0, -1)
          .join("/"),
      );
    } catch (e) {}
    fs.writeFileSync(destination, toWrite + file);
  }
};

grab();
