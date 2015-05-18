# keypair-manager
SSH keypair manager

## Installation

```
npm install keypair-manager -g
```

## Usage

```
ssh-key --help

  Usage: ssh-key [options] [command]


  Commands:

    current             display your current ssh-key name
    set [ssh-key-name]  set a ssh keypair
    list                list all available ssh-keys
    source [path]       set the source folder of your ssh-keys

  Options:

    -h, --help     output usage information
    -V, --version  output the version number

```

*First put all your ssh keypairs in a directory of your choice and give them nice names*

```
/My/Custom/Path/To/Keypairs

	> my_first_keypair
	> my_first_keypair.pub
	> my_second_keypair
	> my_second_keypair.pub
```

*Set the source directory:*

```
ssh-key source /My/Custom/Path/To/Keypairs
```
