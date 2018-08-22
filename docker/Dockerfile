FROM dcb9/qtum-insightapi

RUN wget -v https://github.com/dcb9/janus/releases/download/0.0.3/janus-linux-amd64 -O /usr/local/bin/janus && chmod 0755 /usr/local/bin/janus

COPY init-accounts.sh /usr/local/bin/
COPY cmd.sh /

# janus
EXPOSE 23889

CMD ["/cmd.sh"]
