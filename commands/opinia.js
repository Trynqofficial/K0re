const { SlashCommandBuilder, EmbedBuilder, WebhookClient } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('opinia')
        .setDescription('Dodaj opinię o Kore Sh0p')
        .addStringOption(opt => opt.setName('czas_oczekiwania').setDescription('Ocena (1-5 gwiazdek)').setRequired(true)
            .addChoices({ name: '⭐', value: '⭐' }, { name: '⭐⭐', value: '⭐⭐' }, { name: '⭐⭐⭐', value: '⭐⭐⭐' }, { name: '⭐⭐⭐⭐', value: '⭐⭐⭐⭐' }, { name: '⭐⭐⭐⭐⭐', value: '⭐⭐⭐⭐⭐' }))
        .addStringOption(opt => opt.setName('jakosc_produktu').setDescription('Ocena (1-5 gwiazdek)').setRequired(true)
            .addChoices({ name: '⭐', value: '⭐' }, { name: '⭐⭐', value: '⭐⭐' }, { name: '⭐⭐⭐', value: '⭐⭐⭐' }, { name: '⭐⭐⭐⭐', value: '⭐⭐⭐⭐' }, { name: '⭐⭐⭐⭐⭐', value: '⭐⭐⭐⭐⭐' }))
        .addStringOption(opt => opt.setName('cena_produktu').setDescription('Ocena (1-5 gwiazdek)').setRequired(true)
            .addChoices({ name: '⭐', value: '⭐' }, { name: '⭐⭐', value: '⭐⭐' }, { name: '⭐⭐⭐', value: '⭐⭐⭐' }, { name: '⭐⭐⭐⭐', value: '⭐⭐⭐⭐' }, { name: '⭐⭐⭐⭐⭐', value: '⭐⭐⭐⭐⭐' }))
        .addStringOption(opt => opt.setName('tresc_opinii').setDescription('Twoja opinia').setRequired(true)),

    async execute(interaction) {
        const DOZWOLONY_KANAL = "1479590983975833721";

        if (interaction.channelId !== DOZWOLONY_KANAL) {
            return await interaction.reply({ content: `Użyj tej komendy na <#${DOZWOLONY_KANAL}>`, ephemeral: true });
        }

        // 1. Tworzymy Embed (treść opinii)
        const embed = new EmbedBuilder()
            .setTitle('⭐ 𝙆𝙤𝙧𝙚 𝙎𝙝0𝙥 × 𝙊𝙋𝙄𝙉𝙄𝘼')
            .setColor(0x2b2d31)
            .addFields(
                { name: '👤 × Twórca opinii:', value: `${interaction.user}`, inline: false },
                { name: '📝 × Treść:', value: `\`\`\`${interaction.options.getString('tresc_opinii')}\`\`\``, inline: false },
                { name: '\u200B', value: `⏳ × **Czas oczekiwania:** ${interaction.options.getString('czas_oczekiwania')}\n📋 × **Jakość produktu:** ${interaction.options.getString('jakosc_produktu')}\n💸 × **Cena produktu:** ${interaction.options.getString('cena_produktu')}`, inline: false }
            )
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

        // 2. Magia Webhooka: Bot wysyła wiadomość JAKO użytkownik
        const channel = interaction.channel;
        
        // Szukamy istniejącego webhooka bota lub tworzymy nowy
        const webhooks = await channel.fetchWebhooks();
        let webhook = webhooks.find(wh => wh.owner.id === interaction.client.user.id);
        
        if (!webhook) {
            webhook = await channel.createWebhook({
                name: 'Kore Sh0p Opinie',
                avatar: interaction.client.user.displayAvatarURL(),
            });
        }

        // Wysyłamy wiadomość ustawiając nick i avatar osoby, która wpisała komendę
        await webhook.send({
            content: '',
            username: interaction.user.username,
            avatarURL: interaction.user.displayAvatarURL({ dynamic: true }),
            embeds: [embed],
        });

        // Potwierdzamy użytkownikowi, że opinia dodana (wiadomość efemeryczna - tylko on ją widzi)
        await interaction.reply({ content: 'Twoja opinia została opublikowana!', ephemeral: true });
    },
};
