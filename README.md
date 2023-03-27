# Nasıl kurulur ve çalıştırılır?

- Eğer projeyi hiç çalıştırmadıysanız ilk önce **npm i** ile paketleri kurunuz.
- Sonra projeyi **npm start** ile çalıştırın ve **config.json** ayar dosyası oluşacaktır.
- Oluşan ayar dosyasını tamamlayıp botunuzu **npm start** ile yeniden başlatınız.

# Dosya sistemi bilgisi

- Bottaki komut/etkinlik yapısı karşılaştığınız altyapılardan biraz daha farklı olabilir.
- Eğer komut/etkinlik yapısı aynı değilse dosyalarımız sizin altyapınızda çalışmayacaktır.
- Örnek komut:

```js
const { CommandInteraction } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Botun gecikmesini gösterir.",
  options: [],
  /** @param {CommandInteraction} interaction */
  run: async (interaction) => {
    return interaction.reply(`Gecikmem ${client.ping.ws} milisaniye!`);
  },
};
```

- Örnek etkinlik:

```js
const { Client } = require("discord.js");

/** @param {Client<true>} client */
module.exports = async (client) => {
  console.log(`${client.user.tag} aktif!`);
};
```

# Küçük notlar

- Eğer kodu düzenlerken hata verirse sebebi `// @ts-check` satırıdır.

  > 🗝️ Bu satır, koddaki olası çakışmaları ve hataları kod çalışmadan öngörmemizi sağlar ve bot geliştirme sırasında hata riskimizi azaltır.<br>⚠️ Ne yaptığınızı biliyorsanız satırı silebilirsiniz!

- `/* @param {...} ... */` ve `/* @type {...} */` satırları da neyin nesi?
  > 🗝️ Bu tür fonksiyon parametre türü (**@param**) ve değişken türü (**@type**) belirten satırlar kod yazmamızı kolaylaştırır ve yazdığımız koddan emin olmamızı sağlar.<br>⚠️ Gereksiz görüyorsanız satırı silebilirsiniz!

# Bir hata buldum!

- 🐜 Eğer bir hata bulduysanız ve çözümünü biliyorsanız yeni istek ([pull request](https://github.com/Wyntine/TicketFormBot/compare)) açabilirsiniz!
- 📱 Bana ulaşmak istiyorsanız [discord](https://discord.com/users/920360120469311578) üzerinden ulaşabilirsiniz!
- 👑 Ek olarak, altyapının geliştirilmesinde büyük katkıda bulunan [sunucumuza](https://discord.gg/altyapilar) da gelebilirsiniz!

```ts
const author = "Wyntine";
const goodLuck = "İyi kodlamalar!";

console.log(`✨ ${author}: ${goodLuck} ✨`);
```
