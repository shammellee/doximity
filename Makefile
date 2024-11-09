.ONESHELL:

PROJECT_NAME     := Front-end
ROOT_DIR         := $(realpath $(dir $(abspath $(lastword $(MAKEFILE_LIST)))))
PORT             := 8080
IP               := 0.0.0.0
DIRECTORY        := $(ROOT_DIR)
NODE_MODULES_DIR := $(ROOT_DIR)/node_modules
NODE_BIN_DIR     := $(NODE_MODULES_DIR)/.bin

# Vite CLI Options: https://vite.dev/guide/cli.html
VITE_CMD   := $(NODE_BIN_DIR)/vite
VITE_FLAGS :=

all: dev
.PHONY: all

dev: VITE_FLAGS :=
dev: VITE_FLAGS += --open
dev: $(NODE_BIN_DIR)
	$(VITE_CMD) $(VITE_FLAGS) --port $(PORT) --host $(IP)
.PHONY: dev

$(NODE_BIN_DIR):
	npm install

clean:
	rm -rf $(NODE_MODULES_DIR)
.PHONY: clean

