[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/k4ustu3h/forkfolio/Node.js%20Build?logo=githubactions&logoColor=fff&style=for-the-badge)](https://github.com/k4ustu3h/forkfolio/actions/workflows/node_js_build.yml)
![Depfu](https://img.shields.io/depfu/dependencies/github/k4ustu3h/forkfolio?logo=depfu&style=for-the-badge)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-f7b93e?logo=prettier&style=for-the-badge)](https://github.com/prettier/prettier)
[![GitHub release](https://img.shields.io/github/release/imfunniee/gitfolio.svg?style=for-the-badge)](https://github.com/imfunniee/gitfolio/releases/latest)

# A WORK IN PROGRESS GITFOLIO FORK

# forkfolio

## personal website + blog for every github user

Forkfolio will help you get started with a portfolio website where you could showcase your work + a blog that will help you spread your ideas into real world.

---

Check out this [live demo](https://k4ustu3h.cf) to see forkfolio in action.

---

## Getting Started

### Let's Install

Install forkfolio

```bash
➜  ~ git clone https://github.com/k4ustu3h/forkfolio.git
➜  ~ cd forkfolio
➜  ~ npm install -g
```

### Let's Build

Using the UI

```bash
➜  ~ forkfolio ui
```

> Tip: You can use ui for updating your portfolio too.

or

```bash
➜  ~ forkfolio build <username>
```

`<username>` is your username on github. This will build your website using your GitHub username and put it in the `/dist` folder.

To run your website use `run` command, Default port is 3000

```bash
➜  ~ forkfolio run -p [port]
```

🎉 Congrats, you just made yourself a personal website!

---

### Let's Customize

#### Forks

To include forks on your personal website just provide `-f` or `--fork` argument while building

```bash
➜  ~ forkfolio build <username> -f
```

#### Sorting Repos

To sort repos provide `--sort [sortBy]` argument while building. Where `[sortBy]` can be `star`, `created`, `updated`, `pushed`,`full_name`. Default: `created`

```bash
➜  ~ forkfolio build <username> --sort star
```

#### Ordering Repos

To order the sorted repos provide `--order [orderBy]` argument while building. Where `[orderBy]` can be `asc` or `desc`. Default: `asc`

```bash
➜  ~ forkfolio build <username> --sort star --order desc
```

#### Customize Themes

Themes are specified using the `--theme [theme-name]` flag when running the `build` command. The available themes are

-   `light`
-   `dark`

> TODO: Add more themes

For example, the following command will build the website with the dark theme

```bash
➜  ~ forkfolio build <username> --theme dark
```

#### Customize background image

To customize the background image just provide `--background [url]` argument while building.

```bash
➜  ~ forkfolio build <username> --background https://images.unsplash.com/photo-1557277770-baf0ca74f908?w=1634
```

You could also add in your custom CSS inside `index.css` to give it a more personal feel.

#### Customize profile picture

You can either use your GitHub profile picture or you can add your initials in an animated gradient. Just provide `-i` or `--initials` argument while building.

> Note that the limit of the characters you can enter in your initials is 3. If the characters exceed the limit only the first 3 will be shown.

```bash
➜  ~ forkfolio build <username> --initials K_
```

You can also customize the gradient that your initials by specifying your preferred colors in (xdeg,#color1,#color2,...) format using `-g` or `--gradient` argument.

```bash
➜  ~ forkfolio build <username> --gradient 90deg,#2962ff,#aa00ff,#d50000
```

#### Add Social Media links on your profile

forkfolio supports adding the following Social links

-   Codepen `-c, --codepen <username>`
-   Dev.to `-d, --dev <username>`
-   Discord `-C, --discord <username#tag>`
-   Dribbble `-D, --dribbble <username>`
-   Email `-e, --email <email>`
-   Facebook `-F, --facebook <username>`
-   Instagram `-I, --instagram <username>`
-   Keybase `-k, --keybase <username>`
-   Medium `-m, --medium <username>`
-   PayPal `-P, --paypal <username>`
-   Pinterest `-n, --pinterest <username>`
-   Reddit `-r, --reddit <username>`
-   Snapchat `-S, --snapchat <username>`
-   Stack Exchange `-E, --stackexchange <user id>`
-   Steam `-a, --steam <username>`
-   Telegram `-T, --telegram <username>`
-   TV Time `-V, --tvtime <user id>`
-   Tumblr `-u, --tumblr <username>`
-   Twitch `-w, --twitch <username>`
-   Twitter `-W, --twitter <username>`
-   XDA Developers `-x, --xda <user id>`
-   YouTube `-y, --youtube <channel id>`

```bash
➜  ~ forkfolio build <username> --discord k4ustu3h#5045 --reddit kaustubhladiya --twitter k4ustu3h
```

---

### Let's Publish

Head over to GitHub and create a new repository named `username.github.io`, where username is your username. Push the files inside`/dist` folder to repo you just created.

Go To `username.github.io` your site should be up!!

---

### Updating

To update your info, simply run

```bash
➜  ~ forkfolio update
```

or use the `Update` options in forkfolio's UI

This will update your info and your repository info.

To Update background or theme you need to run `build` command again.

---

## Credits

-   Hat tip to anyone who's code was used
-   The original [gitfolio](https://github.com/imfunniee/gitfolio) made by [@imfunniee](https://github.com/imfunniee/)

---

[![CSS](https://img.shields.io/badge/uses-css-1572B6?logo=css3&style=for-the-badge)](https://github.com/topics/css)
[![h9rbs.js](https://img.shields.io/badge/uses-h9rbs.js-473349?style=for-the-badge)](https://html9responsiveboilerstrapjs.com/)
[![HTML](https://img.shields.io/badge/uses-html-E34F26?logo=html5&style=for-the-badge)](https://github.com/topics/html)
[![JavaScript](https://img.shields.io/badge/made_with-javascript-F7DF1E?logo=javascript&style=for-the-badge)](https://github.com/topics/javascript)
