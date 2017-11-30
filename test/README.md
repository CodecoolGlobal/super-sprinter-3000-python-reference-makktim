# Test solution

## Node.js
Check if you have Node.js installed with `node --version`

If you get an error message, or you have older then 7.x version, you should install the latest version with the following commands:
```
echo 'export PATH=$HOME/local/bin:$PATH' >> ~/.bashrc
. ~/.bashrc
mkdir ~/local
mkdir ~/node-latest-install
cd ~/node-latest-install
curl http://nodejs.org/dist/node-latest.tar.gz | tar xz --strip-components=1
./configure --prefix=~/local
make install # ok, fine, this step probably takes more than 30 seconds...
curl https://www.npmjs.org/install.sh | sh
```

Source: https://gist.github.com/isaacs/579814#file-node-and-npm-in-30-seconds-sh


## Run tests
