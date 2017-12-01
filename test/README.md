# Test solution

## Node.js
Check if you have Node.js installed with `node --version`

If you get an error message, or you have older then 7.x version.
You should install the latest version with the following commands: *(This will take a lot of time...)*
```
echo 'export PATH=$HOME/local/bin:$PATH' >> ~/.bashrc
. ~/.bashrc
mkdir ~/local
mkdir ~/node-latest-install
cd ~/node-latest-install
curl http://nodejs.org/dist/node-latest.tar.gz | tar xz --strip-components=1
./configure --prefix=~/local
make install # ok, fine, this step takes a lot of time...
curl https://www.npmjs.org/install.sh | sh
```

Source: https://gist.github.com/isaacs/579814#file-node-and-npm-in-30-seconds-sh


## Run tests

### From PyCharm
The repository includes running configurations for PyCharm.
If everything is in order, You should find an "All tests" option in the top right corner.
Just select this option, and click the green play button.


### From Terminal
If you can't deal with the PyCharm way, you can run the tests from the terminal with the following command:
```
npm test
```
