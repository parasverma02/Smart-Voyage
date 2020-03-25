# Why unit testing is important:
    # reduce the bugs in new features and existing features
    # tests are good for documentation
    # reduces the cost of change
    # faster debugging
    # faster development
    # better design
 
import app
import pytest


def test_add(): 
    # test_ to recognize the function as a test
    assert app.add(7, 3) == 10
    # we want to assert that the function is giving the desired result
    assert app.add(7) == 9

def test_product():
    assert app.product(5,5) == 25
    assert app.product(5) == 10

def test_add_strings():
    result = app.add('Hello ', 'World')
    assert result == 'Hello World'
    assert type(result) is str
    assert 'Helo' not in result

def test_product_strings():
    assert app.product('Hello', 3) == 'HelloHelloHello'
    result = app.product('Hello')
    assert result == 'HelloHello'
    assert type(result) is str
    assert 'Hello' in result
