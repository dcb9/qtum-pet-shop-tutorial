qtumcore-node start -c /etc/qtumcore-node.json &>/dev/stdout &

janus --qtum-rpc="http://${QTUM_RPC_USER}:${QTUM_RPC_PASS}@localhost:18332" --bind=0.0.0.0 --port=23889 --dev
