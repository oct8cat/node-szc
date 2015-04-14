LIB_DIR = lib
NODE_MODULES_BIN_DIR = node_modules/.bin
TEST_DIR = test

JSHINT = $(NODE_MODULES_BIN_DIR)/jshint
JSHINT_TARGET = $(LIB_DIR) $(TEST_DIR) index.js
MOCHA = $(NODE_MODULES_BIN_DIR)/mocha
MOCHA_TARGET = $(TEST_DIR)

all: jshint $(TEST_DIR)
.PHONY: all

jshint:
	$(JSHINT) $(JSHINT_TARGET)
.PHONY: jshint

$(TEST_DIR):
	$(MOCHA) --recursive $(MOCHA_TARGET)
.PHONY: $(TEST_DIR)
