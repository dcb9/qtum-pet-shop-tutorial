set -e

alias dc="docker-compose"

firstStartInsightAPI=false
if [ "`dc ps | grep [i]nsightapi | wc -l | awk '{print $1}'`" == "0" ] ; then
    firstStartInsightAPI=true
    dc up -d mongo
    echo "Sleep 5s..."
    sleep 5
fi

dc up -d

if [ "$firstStartInsightAPI" = "true" ] ; then
    echo "Sleep 10s..."
    sleep 10
fi

echo "Try to init accounts..."
dc exec insightapi bash -c init-accounts.sh
