# Libinit

Template for new NodeJS apps.

### Usage

Add this function to your `.zshrc` or `.bashrc`
```sh
function template {
  git clone https://github.com/eldoy/libinit.git $1 && rm -rf $1/.git && cd $1 && git init
}
```

Then use like this:
```sh
template name
```

MIT Licensed. Enjoy!
