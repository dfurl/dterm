export const DTERM_VERSION = '0.3.0'

export const DTERM_HISTORY = 'dterm-history'
export const DTERM_SETTINGS = 'dterm-settings'

export const BUILTIN_COMMANDS = [
  {name: 'dat', description: 'Create, remove, and manage dats'},
  {name: 'term', description: 'Configure dterm and install commands'},
  {name: 'ls', description: 'List files in the directory'},
  {name: 'cd', description: 'Change the current directory'},
  {name: 'pwd', description: 'Fetch the current directory'},
  {name: 'echo', description: 'Output the arguments'},
  {name: 'open', description: 'Open file or folder in new tab'},
  {name: 'cat', description: 'Output the contents of one or more files'},
  {name: 'mkdir', description: 'Make a new directory'},
  {name: 'rmdir', description: 'Remove existing directories'},
  {name: 'mv', description: 'Move files or folders'},
  {name: 'cp', description: 'Copy files or folders'},
  {name: 'rm', description: 'Remove files'},
  {name: 'which', description: 'Get the source URL for a given command'},
  {name: 'clear', description: 'Clear the visible command history'},
  {name: 'exit', description: 'Close dterm window'}
]

// Deprecated features, keeping for compatibility
export const DTERM_ENV = 'dterm-env'
export const DTERM_HOME = 'dterm-home'
