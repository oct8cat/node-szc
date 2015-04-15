DOC_DIR = doc
LIB_DIR = lib
NODE_MODULES_BIN_DIR = node_modules/.bin
TEST_DIR = test

JSDOC = $(NODE_MODULES_BIN_DIR)/jsdoc
JSDOC_TARGET = $(LIB_DIR) README.md
JSHINT = $(NODE_MODULES_BIN_DIR)/jshint
JSHINT_TARGET = $(LIB_DIR) $(TEST_DIR) index.js
MOCHA = $(NODE_MODULES_BIN_DIR)/mocha
MOCHA_TARGET = $(TEST_DIR)

all: jsdoc jshint $(TEST_DIR)
.PHONY: all

jsdoc: $(DOC_DIR)
	$(JSDOC) -d $< $(JSDOC_TARGET)
.PHONY: jsdoc

jshint:
	$(JSHINT) $(JSHINT_TARGET)
.PHONY: jshint

$(TEST_DIR):
	$(MOCHA) --recursive $(MOCHA_TARGET)
.PHONY: $(TEST_DIR)
