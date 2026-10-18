{
  description = "A Nix-flake-based Bun development environment";

  inputs = {
    nixpkgs.url = "https://flakehub.com/f/NixOS/nixpkgs/0.1";
    merrkry-nur = {
      url = "github:merrkry/nur-packages";
      flake = false;
    };
  };

  outputs = {self, ...} @ inputs: let
    supportedSystems = [
      "x86_64-linux"
      "aarch64-linux"
      "x86_64-darwin"
      "aarch64-darwin"
    ];
    forEachSupportedSystem = f:
      inputs.nixpkgs.lib.genAttrs supportedSystems (
        system: let
          basePkgs = import inputs.nixpkgs {inherit system;};
          pkgs = basePkgs.extend (final: prev: {
            pnpm_12 = prev.pnpm_12 or prev.pnpm;
          });
          merrkryPkgs = import inputs.merrkry-nur {inherit pkgs;};
          cf = merrkryPkgs.cf.overrideAttrs (old: {
            pnpmDeps = pkgs.fetchPnpmDeps {
              inherit (old) pname version src;
              pnpm = pkgs.pnpm_12 or pkgs.pnpm;
              fetcherVersion = 4;
              hash = "sha256-VThAw/9AB1zW2ZAHpsz3Z8dtRJBOnm1HMRHRneqvamg=";
            };
          });
        in
          f {
            inherit pkgs;
            cf = cf;
          }
      );
  in {
    devShells = forEachSupportedSystem (
      {
        pkgs,
        cf,
      }: {
        default = pkgs.mkShellNoCC {
          packages =
            (with pkgs; [bun tectonic])
            ++ pkgs.lib.optionals pkgs.stdenv.hostPlatform.isLinux [
              cf
            ];
        };
      }
    );
  };
}
