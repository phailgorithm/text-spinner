default: build

install: node_modules
	npm install

install_docs: docs/node_modules
	cd docs && npm install

build: install install_docs
	cd docs && npm run build

clean:
	rm -rf docs/src/.vuepress/dist

node_modules: package.json

docs/node_modules: docs/package.json
