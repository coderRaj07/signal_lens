import pytest
import os
import sys

# Ensure app directory is in path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

@pytest.fixture(scope="session")
def anyio_backend():
    return "asyncio"
