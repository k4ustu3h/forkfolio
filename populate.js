/* eslint-disable no-undef */
import { writeFile } from "fs";
import { URLS } from "github-emoji";
import { JSDOM as jsdom } from "jsdom";
const options = {
  resources: "usable",
};
import { getConfig, outDir } from "./utils.js";
import api from "./api.js";
const { getRepos, getUser } = api;
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

function convertToEmoji(text) {
  if (text == null) return;
  text = text.toString();
  var pattern = /(?<=:\s*).*?(?=\s*:)/gs;
  if (text.match(pattern) != null) {
    var str = text.match(pattern);
    str = str.filter(function (arr) {
      return /\S/.test(arr);
    });
    for (i = 0; i < str.length; i++) {
      if (URLS[str[i]] != undefined) {
        text = text.replace(
          `:${str[i]}:`,
          `<img src="${URLS[str[i]]}" class="emoji">`
        );
      }
    }
    return text;
  } else {
    return text;
  }
}

export function updateHTML(username, opts) {
  const {
    includeFork,
    codepen,
    dev,
    discord,
    dribbble,
    email,
    facebook,
    gradient,
    initials,
    instagram,
    keybase,
    linkedin,
    medium,
    paypal,
    pinterest,
    reddit,
    snapchat,
    stackexchange,
    steam,
    telegram,
    tvtime,
    tumblr,
    twitch,
    twitter,
    xda,
    youtube,
  } = opts;

  //add data to assets/index.html
  jsdom
    .fromFile(`${__dirname}/assets/index.html`, options)
    .then(function (dom) {
      let window = dom.window,
        document = window.document;
      (async () => {
        try {
          console.log("Building HTML/CSS...");
          const repos = await getRepos(username, opts);

          for (var i = 0; i < repos.length; i++) {
            let element;
            if (repos[i].fork == false) {
              element = document.getElementById("work_section");
            } else if (includeFork == true) {
              document.getElementById("forks").style.display = "block";
              element = document.getElementById("forks_section");
            } else {
              continue;
            }
            element.innerHTML += ` <div class="mdc-card fix mdc-theme--surface mdc-theme--on-primary">
        <div class="mdc-card__primary-action" tabindex="0">
            <div class="section_title"><a href="${
              repos[i].html_url
            }" target="_blank" rel="noopener" class="fix">${
              repos[i].name
            }</a></div>
            <div class="about_section" style="display:${
              repos[i].description == undefined ? " none" : "block"
            }">
                <span>${convertToEmoji(repos[i].description)}</span>
            </div>
            <div class="mdc-card__actions">
            <div class="mdc-card__action-buttons">
                <button class="mdc-button mdc-card__action mdc-card__action--button" style="display:${
                  repos[i].language == null ? " none" : "inline-block"
                }"><a href="${repos[i].html_url}/search?l=${repos[i].language}">
                        <div class="mdc-button__ripple"></div>
                        <span class="mdc-button__label"><iconify-icon icon="mdi:code-tags"></iconify-icon>${
                          repos[i].language
                        }</span></span>
                    </a>
                </button>
                <button class="mdc-button mdc-card__action mdc-card__action--button mdc-theme--surface mdc-theme--on-primary"><a href="${
                  repos[i].html_url
                }/stargazers">
                        <div class="mdc-button__ripple"></div>
                        <span class="mdc-button__label"><iconify-icon icon="ic:round-star-outline"></iconify-icon>${
                          repos[i].stargazers_count
                        }</span>
                    </a>
                </button>
                <button class="mdc-button mdc-card__action mdc-card__action--button mdc-theme--surface mdc-theme--on-primary"><a href="${
                  repos[i].html_url
                }/network/members">
                        <div class="mdc-button__ripple"></div>
                        <span class="mdc-button__label"><iconify-icon icon="mdi:source-fork"></iconify-icon>${
                          repos[i].forks_count
                        }
                        </span>
                    </a>
                </button>
            </div>
            </div>
            <div class="mdc-card__ripple"></div>
        </div>
        </div>`;
          }

          const user = await getUser(username);
          document.title = user.login;
          var icon = document.createElement("link");
          icon.setAttribute("rel", "icon");
          icon.setAttribute("href", user.avatar_url);
          icon.setAttribute("type", "image/png");

          document.getElementsByTagName("head")[0].appendChild(icon);
          document.getElementsByTagName("head")[0].innerHTML += `
        <meta name="description" content="${user.bio}" />
        <meta property="og:image" content="${user.avatar_url}" />
        <meta property="og:type" content="profile" />
        <meta property="og:title" content="${user.login}" />
        <meta property="og:url" content="${user.html_url}" />
        <meta property="og:description" content="${user.bio}" />
        <meta property="profile:username" content="${user.login}" />
        <meta name="twitter:image:src" content="${user.avatar_url}" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="${user.login}" />
        <meta name="twitter:description" content="${user.bio}" />`;

          // Decides if initials or profile picture is used
          if (initials == null) {
            document.getElementById("initials").id = `image`;
            document.getElementById(
              "image"
            ).style.background = `url('${user.avatar_url}') center center`;
          } else {
            var initials_limited = initials;
            if (initials_limited.length > 3)
              initials_limited = initials_limited.substring(0, 3);
            document.getElementById(
              "initials"
            ).innerHTML = `<span>${initials_limited}</span>`;
          }

          document.getElementById(
            "username"
          ).innerHTML = `<span style="display:${
            user.name == null || !user.name ? " none" : "block"
          }">${user.name}</span>`;

          document.getElementById("userbio").innerHTML = convertToEmoji(
            user.bio
          );
          document.getElementById("userbio").style.display =
            user.bio == null || !user.bio ? " none" : "block";

          // Social Media links and other info about the user
          document.getElementById("about").innerHTML = `
        <span style="display:${
          user.company == null || !user.company ? " none" : "block"
        }"><iconify-icon icon="mdi:office-building-outline"></iconify-icon> &nbsp; ${
            user.company
          }</span>
        <span style="display:block;"><a href="${
          user.html_url
        }"><iconify-icon icon="simple-icons:github"></iconify-icon>&nbsp;&nbsp;@${
            user.login
          }</a></span>
        <span style="display:${
          email == null ? " none" : "block"
        }"><a href="mailto:${email}" target="_blank" class="socials" rel="noopener"><iconify-icon icon="ic:round-mail-outline"></iconify-icon>&nbsp;&nbsp;${email}</a></span>
        <span style="display:${
          user.location == null || !user.location ? " none" : "block"
        }"><a href="https://www.google.com/maps/search/?api=1&query=${
            user.location
          }"><iconify-icon icon="mdi:map-marker-outline"></iconify-icon>&nbsp;&nbsp;${
            user.location
          }</a></span>
        <span style="display:${
          user.hireable == false || !user.hireable ? " none" : "block"
        }"><iconify-icon icon="mdi:account-tie-outline"></iconify-icon>&nbsp;&nbsp;Available for hire</span>
        <div class="socials">
            <span style="display:${
              codepen == null ? " none" : "block"
            }"><a aria-label="codepen" class="socials" href="https://codepen.io/${codepen}" rel="noopener" target="_blank"><iconify-icon icon="simple-icons:codepen"></iconify-icon></a></span>
            <span style="display:${
              dev == null ? " none" : "block"
            }"><a aria-label="dev" class="socials" href="https://dev.to/${dev}" rel="noopener" target="_blank"><iconify-icon icon="simple-icons:devdotto"></iconify-icon></a></span>
            <span style="display:${
              discord == null ? " none" : "block"
            }"><a class="socials" onclick="openSnackbar()" rel="noopener" style="cursor: pointer" target="_blank"><iconify-icon icon="simple-icons:discord"></iconify-icon></a></span>
            <span style="display:${
              dribbble == null ? " none" : "block"
            }"><a aria-label="dribbble" class="socials" href="https://www.dribbble.com/${dribbble}" rel="noopener" target="_blank"><iconify-icon icon="simple-icons:dribbble"></iconify-icon></a></span>
            <span style="display:${
              facebook == null ? " none" : "block"
            }"><a aria-label="facebook" class="socials" href="https://fb.me/${facebook}" rel="noopener" target="_blank"><iconify-icon icon="simple-icons:facebook"></iconify-icon></a></span>
            <span style="display:${
              instagram == null ? " none" : "block"
            }"><a aria-label="instagram" class="socials" href="https://www.instagram.com/${instagram}" rel="noopener" target="_blank"><iconify-icon icon="simple-icons:instagram"></iconify-icon></a></span>
            <span style="display:${
              keybase == null ? " none" : "block"
            }"><a aria-label="keybase" class="socials" href="https://keybase.io/${keybase}" rel="noopener" target="_blank"><iconify-icon icon="simple-icons:keybase"></iconify-icon></a></span>
            <span style="display:${
              linkedin == null ? " none" : "block"
            }"><a aria-label="linkedin" class="socials" href="https://www.linkedin.com/in/${linkedin}/" rel="noopener" target="_blank"><iconify-icon icon="simple-icons:linkedin"></iconify-icon></a></span>
            <span style="display:${
              medium == null ? " none" : "block"
            }"><a aria-label="medium" class="socials" href="https://medium.com/@${medium}" rel="noopener" target="_blank"><iconify-icon icon="simple-icons:medium"></iconify-icon></a></span>
            <span style="display:${
              paypal == null ? " none" : "block"
            }"><a aria-label="paypal" class="socials" href="https://paypal.me/${paypal}" rel="noopener" target="_blank"><iconify-icon icon="simple-icons:paypal"></iconify-icon></a></span>
            <span style="display:${
              pinterest == null ? " none" : "block"
            }"><a aria-label="pinterest" class="socials" href="https://pinterest.com/${pinterest}" rel="noopener" target="_blank"><iconify-icon icon="simple-icons:pinterest"></iconify-icon></a></span>
            <span style="display:${
              reddit == null ? " none" : "block"
            }"><a aria-label="reddit" class="socials" href="https://www.reddit.com/u/${reddit}" rel="noopener" target="_blank"><iconify-icon icon="simple-icons:reddit"></iconify-icon></a></span>
            <span style="display:${
              snapchat == null ? " none" : "block"
            }"><a aria-label="snapchat" class="socials" href="https://www.snapchat.com/add/${snapchat}" rel="noopener" target="_blank"><iconify-icon icon="simple-icons:snapchat"></iconify-icon></a></span>
            <span style="display:${
              stackexchange == null ? " none" : "block"
            }"><a aria-label="stackexchange" class="socials" href="https://stackexchange.com/users/${stackexchange}" rel="noopener" target="_blank"><iconify-icon icon="simple-icons:stackexchange"></iconify-icon></a></span>
            <span style="display:${
              steam == null ? " none" : "block"
            }"><a aria-label="steam" class="socials" href="https://steamcommunity.com/id/${steam}" rel="noopener" target="_blank"><iconify-icon icon="simple-icons:steam"></iconify-icon></a></span>
            <span style="display:${
              telegram == null ? " none" : "block"
            }"><a aria-label="telegram" class="socials" href="https://t.me/${telegram}" rel="noopener" target="_blank"><iconify-icon icon="simple-icons:telegram"></iconify-icon></a></span>
            <span style="display:${
              tvtime == null ? " none" : "block"
            }"><a aria-label="tvtime" class="socials" href="https://tvtime.com/r/${tvtime}" rel="noopener" target="_blank"><iconify-icon icon="simple-icons:tvtime"></iconify-icon></a></span>
            <span style="display:${
              tumblr == null ? " none" : "block"
            }"><a aria-label="tumblr" class="socials" href="https://${tumblr}.tumblr.com/" rel="noopener" target="_blank"><iconify-icon icon="simple-icons:tumblr"></iconify-icon></a></span>
            <span style="display:${
              twitch == null ? " none" : "block"
            }"><a aria-label="twitch" class="socials" href="https://www.twitch.tv/${twitch}" rel="noopener" target="_blank"><iconify-icon icon="simple-icons:twitch"></iconify-icon></a></span>
            <span style="display:${
              twitter == null ? " none" : "block"
            }"><a aria-label="twitter" class="socials" href="https://www.twitter.com/${twitter}" rel="noopener" target="_blank"><iconify-icon icon="simple-icons:twitter"></iconify-icon></a></span>
            <span style="display:${
              xda == null ? " none" : "block"
            }"><a aria-label="xda" class="socials" href="https://forum.xda-developers.com/member.php?u=${xda}" rel="noopener" target="_blank"><iconify-icon icon="simple-icons:xdadevelopers"></iconify-icon></a></span>
            <span style="display:${
              youtube == null ? " none" : "block"
            }"><a aria-label="youtube" class="socials" href="https://www.youtube.com/channel/${youtube}" rel="noopener" target="_blank"><iconify-icon icon="simple-icons:youtube"></iconify-icon></a></span>
        </div>
        </div>
        `;

          document.getElementById("snackbar").innerHTML = `
          <div id="snackbar">
          <div class="mdc-snackbar">
            <div class="mdc-snackbar__surface">
              <div
                aria-live="polite"
                class="mdc-snackbar__label"
                id="discord_username"
                role="username"
              >
                ${discord}
              </div>
              <button
                class="mdc-icon-button"
                onclick="copyToClipboard('#discord_username')"
              >
                <div class="mdc-icon-button__ripple"></div>
                <iconify-icon icon="ic:outline-content-copy"></iconify-icon>
              </button>
              <div class="mdc-snackbar__actions">
                <a
                  href="https://discord.com/channels/@me"
                  style="text-decoration: none"
                >
                  <button class="mdc-button mdc-snackbar__action" type="button">
                    <div class="mdc-button__ripple"></div>
                    <span class="mdc-button__label mdc-theme--primary">
                      Open Discord
                    </span>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>        
        `;

          if (gradient == null) {
            var div = document.getElementById("gradient");
            div.remove();
          } else {
            document.getElementById("gradient").innerHTML = `<style>
            :root {
                --gradient: linear-gradient(${gradient}
              );
            }
        </style>`;
          }

          //add data to config.json
          const data = await getConfig();
          data[0].username = user.login;
          data[0].name = user.name;
          data[0].userimg = user.avatar_url;

          writeFile(
            `${outDir}/config.json`,
            JSON.stringify(data, null, " "),
            function (err) {
              if (err) throw err;
              console.log("Config file updated.");
            }
          );

          document
            .querySelectorAll(
              "button[style='display: none'], div[style='display: none'], span[style='display: none']"
            )
            .forEach(function (cleanup) {
              cleanup.parentElement.removeChild(cleanup);
            });
          console.log(`Cleaning up HTML...`);

          writeFile(
            `${outDir}/index.html`,
            "<!DOCTYPE html>" + window.document.documentElement.outerHTML,
            function (error) {
              if (error) throw error;
              console.log(`Build Complete, Files can be Found @ ${outDir}\n`);
            }
          );
        } catch (error) {
          console.log(error);
        }
      })();
    })
    .catch(function (error) {
      console.log(error);
    });
}
