with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

start = text.find('id="cardapio"')
end = text.find('id="ofertas"')
print(text[start:end])
