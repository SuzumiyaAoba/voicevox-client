#!/bin/bash

# VOICEVOX Client Release Script
# Usage: ./scripts/release.sh <version> [--prerelease]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if version is provided
if [ -z "$1" ]; then
    log_error "Version is required"
    echo "Usage: $0 <version> [--prerelease]"
    echo "Example: $0 1.0.0"
    echo "Example: $0 1.0.0-beta.1 --prerelease"
    exit 1
fi

VERSION="$1"
PRERELEASE=false

# Check for prerelease flag
if [ "$2" = "--prerelease" ]; then
    PRERELEASE=true
fi

# Validate version format
if [[ ! $VERSION =~ ^[0-9]+\.[0-9]+\.[0-9]+(-[a-zA-Z0-9]+(\.[0-9]+)?)?$ ]]; then
    log_error "Invalid version format: $VERSION"
    echo "Valid formats: 1.0.0, 1.0.0-alpha.1, 1.0.0-beta, etc."
    exit 1
fi

log_info "Preparing release v$VERSION"

# Check if we're on the main branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ] && [ "$CURRENT_BRANCH" != "master" ]; then
    log_warning "You are not on the main branch (current: $CURRENT_BRANCH)"
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        log_info "Release cancelled"
        exit 0
    fi
fi

# Check if working directory is clean
if [ -n "$(git status --porcelain)" ]; then
    log_error "Working directory is not clean"
    git status
    exit 1
fi

# Fetch latest changes
log_info "Fetching latest changes..."
git fetch origin

# Check if tag already exists
if git tag -l | grep -q "^v$VERSION$"; then
    log_error "Tag v$VERSION already exists"
    exit 1
fi

# Run tests
log_info "Running tests..."
if ! npm run test:run; then
    log_error "Tests failed"
    exit 1
fi
log_success "Tests passed"

# Run linting
log_info "Running linter..."
if ! npm run check; then
    log_error "Linting failed"
    exit 1
fi
log_success "Linting passed"

# Build package
log_info "Building package..."
if ! npm run build:dual; then
    log_error "Build failed"
    exit 1
fi
log_success "Build completed"

# Update package.json version
log_info "Updating package.json version to $VERSION..."
npm version $VERSION --no-git-tag-version

# Commit version change
git add package.json
git commit -m "chore: bump version to $VERSION"

# Create tag
log_info "Creating tag v$VERSION..."
if [ "$PRERELEASE" = true ]; then
    TAG_MESSAGE="Pre-release v$VERSION"
else
    TAG_MESSAGE="Release v$VERSION"
fi

git tag -a "v$VERSION" -m "$TAG_MESSAGE"

# Push changes and tag
log_info "Pushing changes and tag..."
git push origin $CURRENT_BRANCH
git push origin "v$VERSION"

log_success "Release v$VERSION created successfully!"
log_info "GitHub Actions will automatically publish to npm"
log_info "Monitor the release at: https://github.com/SuzumiyaAoba/voicevox-client/actions"

# Open browser to actions page (if available)
if command -v open &> /dev/null; then
    log_info "Opening GitHub Actions page..."
    open "https://github.com/SuzumiyaAoba/voicevox-client/actions"
elif command -v xdg-open &> /dev/null; then
    log_info "Opening GitHub Actions page..."
    xdg-open "https://github.com/SuzumiyaAoba/voicevox-client/actions"
fi
