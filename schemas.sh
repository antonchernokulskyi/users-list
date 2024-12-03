#!/bin/bash

# Define the path to the generated file
GENERATED_FILE="src/shared/themes/ui/helpers/stylesheet.ts"

# Check if the generated file exists
if [ ! -f "$GENERATED_FILE" ]; then
  echo "Generated file not found. Please ensure ts-to-zod has run successfully."
  exit 1
fi

# Replace occurrences of z.literal(Animated.AnimatedNode) with z.any()
# The '' after -i is for compatibility with macOS sed
sed -i '' 's/z\.literal(Animated\.AnimatedNode)/z\.any()/g' "$GENERATED_FILE"

# Inform the user that the replacements have been made
echo "Replaced Animated.AnimatedNode with z.any() in $GENERATED_FILE"

npm run lint:fix
