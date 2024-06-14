.PHONY:default
default:
	echo "Please Specify The Packaged APP ... "

.PHONY:chatwiki
chatwiki:
	go version
	cd cmd/chatwiki&&go mod tidy
	set GOARCH=amd64&&set GOOS=linux&&go build -o build/chatwiki -ldflags "-s -w" cmd/chatwiki/main.go
	cd build&&git add chatwiki&&git update-index --chmod=+x chatwiki&&git ls-files --stage chatwiki

.PHONY:chatwiki_mac
chatwiki_mac:
	go version
	cd cmd/chatwiki&&go mod tidy
	GOARCH=amd64 GOOS=linux go build -o build/chatwiki -ldflags "-s -w" cmd/chatwiki/main.go
	cd build&&chmod a+x chatwiki&&ls -l chatwiki

.PHONY:message_service
message_service:
	go version
	cd cmd/message_service&&go mod tidy
	set GOARCH=amd64&&set GOOS=linux&&go build -o build/message_service -ldflags "-s -w" cmd/message_service/main.go
	cd build&&git add message_service&&git update-index --chmod=+x message_service&&git ls-files --stage message_service

.PHONY:message_service_mac
message_service_mac:
	go version
	cd cmd/message_service&&go mod tidy
	GOARCH=amd64 GOOS=linux go build -o build/message_service -ldflags "-s -w" cmd/message_service/main.go
	cd build&&chmod a+x message_service&&ls -l message_service

.PHONY:make_all
make_all:
	make chatwiki
	make message_service

.PHONY:make_all_mac
make_all_mac:
	make chatwiki_mac
	make message_service_mac