#!/bin/bash

# Display message indicating that Prettier is running
echo "Running Prettier formatting..."

# Run Prettier on all files, excluding those in .prettierignore
npx prettier --write .

# Display message after Prettier has finished
echo "Prettier formatting complete."
