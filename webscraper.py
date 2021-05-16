import requests
from bs4 import BeautifulSoup as bs

def get_soup(URL):
    page = requests.get(URL)
    soup = bs(page.content, 'html.parser')
    return soup

def find_table_with(string, soup):
    divs = soup.find_all('div', {"style": "text-align:center"})
    for div in divs:
        table = div.find('table')
        if table:
            rows = table.find_all('tr')
            for row in rows:
                cols = row.find_all("td")
                for ele in row.find_all('td'):
                    if string in ele.text.strip():
                        return rows

def parse_table(table):
    data = []
    titles = []
    dict = []
    row_num = 0
    for row in table:
        row_num +=1
        cols = row.find_all('td')
        cols = [ele.text.strip() for ele in cols]
        for ele in cols:
            if ele:
                if row_num == 2:
                    titles.append(ele)
                else:
                    data.append(ele)
        if row_num % 3== 0:
            entry = {}
            i = int((20 * row_num/3) - 20)
            if i % 20 == 0:
                for title in titles:
                    entry.update({title: data[i]})
                    i+=1
            dict.append(entry)
    return dict

soup = get_soup("https://www.sec.gov/Archives/edgar/data/1326801/000132680121000022/facebook2021definitiveprox.htm")
table = find_table_with("Name and Principal Position", soup)
data = parse_table(table)

with open("data.json", "w", encoding="utf-8") as output_data:
    output_data.write(str(data))
