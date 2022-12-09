#!/usr/bin/env python
# coding: utf-8

# In[1]:


import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import re
import pandas as pd
import numpy as np


# In[2]:


def elmscraper(url, category):
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
    categories = np.repeat(category, len(pricelist))
    df = pd.DataFrame({'price':pricelist, 'product':prodnames, 'category':categories})
    df_final = df[df['product'].str.contains(category, case = False)]
    return df_final


# In[3]:


def elmscraper1(url, category):
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
    categories = np.repeat(category, len(pricelist))
    df = pd.DataFrame({'price':pricelist, 'product':prodnames, 'category':categories})
    return df


# In[4]:


bread_elm = elmscraper("https://elmcitymarketdelivers.com/search.php?search_query=bread&section=product&sort=relevance", "bread")
milk_elm = elmscraper("https://elmcitymarketdelivers.com/grocery/dairy/milk-cream.html", "milk")
eggs_elm = elmscraper("https://elmcitymarketdelivers.com/categories/grocery/dairy/eggs-butter.html", "eggs")
butter_elm = elmscraper("https://elmcitymarketdelivers.com/categories/grocery/dairy/eggs-butter.html", "butter")
cheese_elm = elmscraper1("https://elmcitymarketdelivers.com/grocery/dairy/cheese.html", "cheese")
bacon_elm = elmscraper("https://elmcitymarketdelivers.com/search.php?search_query=bacon&section=product", "bacon")
chips_elm = elmscraper("https://elmcitymarketdelivers.com/categories/grocery/snacks/chips-dips.html", "chips")
cookies_elm = elmscraper("https://elmcitymarketdelivers.com/search.php?search_query=cookies&section=product", "cookies")
fruit_elm = elmscraper1("https://elmcitymarketdelivers.com/categories/grocery/ecm-fresh/produce/fresh-fruit.html", "fruit")
icecream_elm = elmscraper("https://elmcitymarketdelivers.com/grocery/frozen/ice-cream-sorbets-deserts.html", "ice cream")
pasta_elm = elmscraper("https://elmcitymarketdelivers.com/search.php?search_query=pasta&section=product&_bc_fsnf=1&category=19", "pasta")
cereal_elm = elmscraper("https://elmcitymarketdelivers.com/categories/grocery/the-pantry/hot-and-cold-cereal.html", "cereal")


# In[5]:


df_elm = pd.concat([bread_elm, milk_elm, eggs_elm, butter_elm, cheese_elm, bacon_elm, chips_elm, cookies_elm, fruit_elm, icecream_elm, pasta_elm, cereal_elm])


# In[6]:


def shopritescraper(url, category):
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
    prices = soups.find_all(attrs = {"class":["ProductCardPrice--ogjs72 hbXvaR","ProductCardPrice--ogjs72 fgefyT"]})
    pricelist=[]
    for i in range(len(prices)):
        price = prices[i]
        pricelist.append(price.get_text())
    categories = np.repeat(category, len(pricelist))
    df = pd.DataFrame({'price':pricelist, 'product':prodnames, 'category':categories})
    df = df.drop_duplicates()
    df = df[~df['price'].str.contains("avg/ea", case = False)]
    df_final = df[~df['price'].str.contains("lb", case = False)]
    return df_final


# In[7]:


bread_sr = shopritescraper("https://www.shoprite.com/sm/pickup/rsid/3000/categories/bread-%26-bakery/fresh-bakery-bread-id-520567", "bread")
milk_sr = shopritescraper("https://www.shoprite.com/sm/pickup/rsid/3000/categories/dairy/milk-id-520592", "milk")


# In[8]:


eggs_sr = shopritescraper("https://www.shoprite.com/sm/pickup/rsid/3000/categories/dairy/eggs-%26-egg-substitutes-id-520591?take=30&f=Category%3AFresh+Eggs", "eggs")
butter_sr = shopritescraper("https://www.shoprite.com/sm/pickup/rsid/3000/categories/butter-%26-margarine/butter-id-520007", "butter")


# In[9]:


cheese_sr = shopritescraper("https://www.shoprite.com/sm/pickup/rsid/3000/categories/dairy/packaged-cheese-id-520599?page=2&skip=30", "cheese")
bacon_sr = shopritescraper("https://www.shoprite.com/sm/pickup/rsid/3000/categories/meat/bacon-%26-breakfast-meats-id-519891?page=1&skip=0", "bacon")


# In[10]:


shopritescraper("https://www.shoprite.com/sm/pickup/rsid/3000/categories/snacks/cookies-id-520167", "cookies")


# In[11]:


chips_sr = shopritescraper("https://www.shoprite.com/sm/pickup/rsid/3000/categories/chips-pretzels-%26-popcorn/chips-potato-id-519176?page=2&skip=30", "chips")
cookies_sr = shopritescraper("https://www.shoprite.com/sm/pickup/rsid/3000/categories/snacks/cookies-id-520167", "cookies")


# In[12]:


fruit_sr = shopritescraper("https://www.shoprite.com/sm/pickup/rsid/3000/categories/produce/fresh-fruit-id-520537", "fruit")
icecream_sr = shopritescraper("https://www.shoprite.com/sm/pickup/rsid/3000/categories/ice-cream-%26-novelties/ice-cream-id-520096", "ice cream")


# In[13]:


cereal_sr = shopritescraper("https://www.shoprite.com/sm/pickup/rsid/3000/categories/cereal/cold-cereal-id-520744", "cereal")
pasta_sr = shopritescraper("https://www.shoprite.com/sm/pickup/rsid/3000/categories/pasta-sauces-%26-grains/pasta-id-520188", "pasta")


# In[14]:


df_sr = pd.concat([bread_sr,milk_sr, eggs_sr, butter_sr, cheese_sr, bacon_sr, chips_sr, cookies_sr, fruit_sr, icecream_sr, cereal_sr, pasta_sr])


# In[15]:


df_elm.to_csv('elmcitymarket.csv')
df_sr.to_csv("shoprite.csv")


# In[16]:


df_elm['store'] = np.repeat("Elm City Market", len(df_elm))
df_elm['store_id'] = np.repeat(1, len(df_elm))


# In[17]:


df_sr['store'] = np.repeat("ShopRite", len(df_sr))
df_sr['store_id'] = np.repeat(2, len(df_sr))


# In[18]:


alldat = pd.concat([df_elm, df_sr])


# In[19]:


product = alldat[['product', 'category']]


# In[20]:


product['product_id'] = list(range(1, (len(product)+1)))


# In[21]:


sold_at = alldat[['store_id', 'price']]
sold_at['product_id'] = product[['product_id']]


# In[22]:


store = pd.DataFrame()


# In[23]:


store['store_id'] = [1,2]
store['name']=['Elm City Market', 'ShopRite']
store['address'] = ['777 Chapel St, New Haven, CT 06510', '745 Foxon Rd, East Haven, CT 06513']
store['open_time'] = ['8:00 AM', '7:00 AM']
store['close_time'] = ['8:00 PM', '10:00 PM']


# In[24]:


store.to_csv('store.csv')


# In[25]:


product.to_csv('product.csv')


# In[26]:


sold_at.to_csv('sold_at.csv')

