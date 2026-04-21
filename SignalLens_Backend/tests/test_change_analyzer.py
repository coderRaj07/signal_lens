import pytest
from app.services.change_analyzer import calculate_change_percentage, is_significant_change

def test_calculate_change_percentage_identical():
    old = "This is a test"
    new = "This is a test"
    assert calculate_change_percentage(old, new) == 0.0

def test_calculate_change_percentage_completely_different():
    old = "Apple"
    new = "Banana"
    # Similarity should be low
    assert calculate_change_percentage(old, new) > 0.0

def test_calculate_change_percentage_minor_addition():
    old = "This is a simple test case for change analyzer."
    new = "This is a simple test case for change analyzer. New sentence."
    change = calculate_change_percentage(old, new)
    assert 10.0 < change < 30.0

def test_is_significant_change():
    assert is_significant_change(15.0, 10.0) is True
    assert is_significant_change(5.0, 10.0) is False
    assert is_significant_change(10.0, 10.0) is True
