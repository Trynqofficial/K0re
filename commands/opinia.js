const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('opinia')
        .setDescription('Dodaj opinię o Kore Sh0p')
        .addStringOption(opt => opt.setName('czas_oczekiwania').setDescription('Ocena (1-5 gwiazdek)').setRequired(true)
            .addChoices(
                { name: '⭐', value: '⭐' }, 
                { name: '⭐⭐', value: '⭐⭐' }, 
                { name: '⭐⭐⭐', value: '⭐⭐⭐' }, 
                { name: '⭐⭐⭐⭐', value: '⭐⭐⭐⭐' }, 
                { name: '⭐⭐⭐⭐⭐', value: '⭐⭐⭐⭐⭐' }
            ))
        .addStringOption(opt => opt.setName('jakosc_produktu').setDescription('Ocena (1-5 gwiazdek)').setRequired(true)
            .addChoices(
                { name: '⭐', value: '⭐' }, 
                { name: '⭐⭐', value: '⭐⭐' }, 
                { name: '⭐⭐⭐', value: '⭐⭐⭐' }, 
                { name: '⭐⭐⭐⭐', value: '⭐⭐⭐⭐' }, 
                { name: '⭐⭐⭐⭐⭐', value: '⭐⭐⭐⭐⭐' }
            ))
        .addStringOption(opt => opt.setName('cena_produktu').setDescription('Ocena (1-5 gwiazdek)').setRequired(true)
            .addChoices(
                { name: '⭐', value: '⭐' }, 
                { name: '⭐⭐', value: '⭐⭐' }, 
                { name: '⭐⭐⭐', value: '⭐⭐⭐' }, 
                { name: '⭐⭐⭐⭐', value: '⭐⭐⭐⭐' }, 
                { name: '⭐⭐⭐⭐⭐', value: '⭐⭐⭐⭐⭐' }
            ))
        .addStringOption(opt => opt.setName('tresc_opinii').setDescription('Twoja opinia').setRequired(true)),

    async execute(interaction) {
        // KONFIGURACJA ID
        const DOZWOLONY_SERWER = "1476957231034663153";
        const DOZWOLONY_KANAL = "1479590983975833721";

        // 1. Sprawdzenie czy serwer i kanał się zgadzają
        if (interaction.guildId !== DOZWOLONY_SERWER || interaction.channelId !== DOZWOLONY_KANAL) {
            return await interaction.reply({ 
                content: `Tej komendy można używać tylko na kanale <#${DOZWOLONY_KANAL}>!`, 
                ephemeral: true 
            });
        }

        // 2. Tworzenie Embedu opinii
        const embed = new EmbedBuilder()
            .setTitle('⭐ 𝙆𝙤𝙧𝙚 𝙎𝙝0𝙥 × 𝙊𝙋𝙄𝙉𝙄𝘼')
            .setColor(0x2b2d31)
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .addFields(
                { name: '👤 × Twórca opinii:', value: `${interaction.user}`, inline: false },
                { name: '📝 × Treść:', value: `\`\`\`${interaction.options.getString('tresc_opinii')}\`\`\``, inline: false },
                { name: '\u200B', value: `⏳ × **Czas oczekiwania:** ${interaction.options.getString('czas_oczekiwania')}\n📋 × **Jakość produktu:** ${interaction.options.getString('jakosc_produktu')}\n💸 × **Cena produktu:** ${interaction.options.getString('cena_produktu')}`, inline: false }
            )
            .setTimestamp();

        try {
            // 3. Obsługa Webhooka (dla efektu APL. przy nicku usera)
            const channel = interaction.channel;
            const webhooks = await channel.fetchWebhooks();
            let webhook = webhooks.find(wh => wh.owner.id === interaction.client.user.id);
            
            if (!webhook) {
                webhook = await channel.createWebhook({
                    name: 'Kore Sh0p Opinie',
                    avatar: interaction.client.user.displayAvatarURL(),
                });
            }

            // Wysyłka opinii jako użytkownik
            await webhook.send({
                username: interaction.user.username,
                avatarURL: interaction.user.displayAvatarURL({ dynamic: true }),
                embeds: [embed],
            });

            // 4. Ciche zakończenie interakcji (pojawia się i znika)
            await interaction.reply({ content: 'Wysłano opinię!', ephemeral: true });
            await interaction.deleteReply();

        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Wystąpił błąd przy wysyłaniu opinii. Sprawdź uprawnienia bota (Manage Webhooks).', ephemeral: true });
        }
    },
};
