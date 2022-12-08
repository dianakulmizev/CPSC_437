#!/usr/bin/env python
# coding: utf-8

# In[1]:


import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import re
import pandas as pd


# In[7]:


def elmscraper(url):
    page = requests.get(url)
    soup = BeautifulSoup(page.text, 'html.parser')
    brands = soup.find_all(class_="card-text brandName")
    brandnames=[]
    for i in range(len(brands)):
        brand=brands[i]
        brandnames.append(brand.get_text())
    prices = soup.find_all(class_="price price--withoutTax")
    pricelist=[]
    for i in range(len(prices)):
        price = prices[i]
        pricelist.append(price.get_text())
    product = soup.find_all(class_="card-title")

    prodnames=[]
    for i in range(len(product)):
        prod=product[i]
        prodnames.append(prod.get_text())

    prodnames = [re.sub("\n", "", x) for x in prodnames]
    df = pd.DataFrame({'price':pricelist, 'product':prodnames})
    return df


# In[21]:


snacks_elm = elmscraper("https://elmcitymarketdelivers.com/categories/grocery/snacks.html")
bread_elm = elmscraper("https://elmcitymarketdelivers.com/search.php?search_query=bread&section=product&sort=relevance")

df = pd.concat([snacks_elm,bread_elm])


# In[18]:


def shopritescraper(url):
    opts = Options()
    opts.add_argument("user-agent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'")
    chrome = webdriver.Chrome(executable_path='/Users/chelseafang/chromedriver', options=opts)
    chrome.get(url)
    source = chrome.page_source
    soups = BeautifulSoup(source, 'html.parser')
    chrome.quit
    product = soups.find_all(class_="sc-hKFyIo bdDYJz")
    prodnames=[]
    for i in range(len(product)):
        prod=product[i]
        prodnames.append(prod.get_text())
    prodnames = [re.sub("Open product description", "", x) for x in prodnames]
    prices = soups.find_all(class_="ProductCardPrice--ogjs72 hbXvaR")
    pricelist=[]
    for i in range(len(prices)):
        price = prices[i]
        pricelist.append(price.get_text())
    df = pd.DataFrame({'price':pricelist, 'product':prodnames})
    df = df.drop_duplicates()
    return df


# In[19]:


bread_sr = shopritescraper("https://www.shoprite.com/sm/pickup/rsid/3000/categories/bread-%26-bakery/fresh-bakery-bread-id-520567")
milk_sr = shopritescraper("https://www.shoprite.com/sm/pickup/rsid/3000/categories/dairy/milk-id-520592")

df1 = pd.concat([bread_sr,milk_sr])

