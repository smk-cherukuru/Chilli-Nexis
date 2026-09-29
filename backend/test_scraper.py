import requests
from bs4 import BeautifulSoup
import json

url = "https://www.commodityonline.com/mandiprices/green-chilli"
headers = {'User-Agent': 'Mozilla/5.0'}
response = requests.get(url, headers=headers)
soup = BeautifulSoup(response.text, 'html.parser')

data = []
table = soup.find('table')
if table:
    rows = table.find_all('tr')[1:] # Skip header
    for row in rows:
        cols = row.find_all('td')
        if len(cols) >= 6:
            data.append({
                "market": cols[0].text.strip(),
                "arrival_date": cols[1].text.strip(),
                "variety": cols[2].text.strip(),
                "min_price": cols[3].text.strip(),
                "max_price": cols[4].text.strip(),
                "modal_price": cols[5].text.strip()
            })

print(json.dumps(data[:10], indent=2))
