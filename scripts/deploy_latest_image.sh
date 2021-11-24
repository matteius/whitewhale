result=$(doctl registry repository list-tags whitewhale | grep latest | grep -o sha256:.* | xargs -i kubectl set image deployment/whitewhale whitewhale=registry.digitalocean.com/whitewhale/whitewhale@{} -n whitewhale)
echo $result
result=$(doctl registry repository list-tags whitewhale | grep latest | grep -o sha256:.* | xargs -i kubectl set image deployment/whitewhale-fastapi whitewhale-fastapi=registry.digitalocean.com/whitewhale/whitewhale@{} -n whitewhale)
echo $result
