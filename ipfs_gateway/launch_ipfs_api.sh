apt install python3-full -y
pip3 update -r requirements.txt  --break-system-packages 
gunicorn --access-logfile - -w 3 -b 0.0.0.0:2442 ipfs_gateway:app