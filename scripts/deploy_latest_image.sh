result=$(doctl registry repository list-tags whitewhale | grep latest | grep -o sha256:.* | xargs -i kubectl set image deployment/whitewhale whitewhale=registry.digitalocean.com/whitewhale/whitewhale@{} -n whitewhale)
echo $result
