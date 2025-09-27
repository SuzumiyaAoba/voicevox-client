{
  description = "VOICEBOX API Client Development Environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            # TypeScript development
            bun
            nodejs_20
            typescript
            
            # Docker for VOICEVOX API server
            docker
            docker-compose
            
            # Development tools
            git
            curl
            jq
            
            # Optional utilities
            tree
            which
          ];

          shellHook = ''
            echo "🎤 VOICEBOX Client Development Environment"
            echo "=================================="
            echo "Available tools:"
            echo "  • bun $(bun --version)"
            echo "  • node $(node --version)"
            echo "  • typescript $(tsc --version)"
            echo "  • docker $(docker --version 2>/dev/null || echo 'not running')"
            echo ""
            echo "Getting started:"
            echo "  bun install          # Install dependencies"
            echo "  bun run dev          # Start development"
            echo "  docker-compose up    # Start VOICEVOX API server"
            echo ""
            
            # Ensure bun dependencies are installed
            if [ -f "package.json" ] && [ ! -d "node_modules" ]; then
              echo "Installing dependencies..."
              bun install
            fi
          '';

          # Environment variables
          DOCKER_BUILDKIT = "1";
          COMPOSE_DOCKER_CLI_BUILD = "1";
        };
      });
}
