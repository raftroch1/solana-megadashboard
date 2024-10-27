{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    python311
    python311Packages.pip
    python311Packages.virtualenv
    python311Packages.fastapi
    python311Packages.uvicorn
    python311Packages.pydantic
    python311Packages.python-dotenv
    python311Packages.httpx
    python311Packages.redis
    python311Packages.python-jose
    python311Packages.passlib
    python311Packages.python-multipart
    python311Packages.bcrypt
    
    # Build dependencies
    gcc
    gnumake
    cmake
    pkg-config
  ];
  
  shellHook = ''
    # Create and activate virtual environment
    python -m venv .venv
    source .venv/bin/activate
    # Install additional packages not available in nixpkgs
    pip install supabase crewai pydantic-settings
    export PYTHONPATH=$PWD:$PYTHONPATH
  '';
}
