const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

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
        .addStringOption(opt => opt.setName('tresc_opinii').setDescription('Chcesz coś jeszcze dodać?').setRequired(true)),

    async execute(interaction) {
        // KONFIGURACJA ID
        const DOZWOLONY_SERWER = "1476957231034663153";
        const DOZWOLONY_KANAL = "1479590983975833721";

        // Sprawdzenie czy serwer i kanał się zgadzają
        if (interaction.guildId !== DOZWOLONY_SERWER || interaction.channelId !== DOZWOLONY_KANAL) {
            return await interaction.reply({ 
                content: `Tej komendy można używać tylko na kanale <#${DOZWOLONY_KANAL}> na oficjalnym serwerze!`, 
                ephemeral: true // Tylko użytkownik widzi ten błąd
            });
        }

        const embed = new EmbedBuilder()
            .setTitle('⭐ 𝙆𝙤𝙧𝙚 𝙎𝙝0𝙥 × 𝙊𝙋𝙄𝙉𝙄𝘼')
            .setColor(0x2b2d31)
            .addFields(
                { name: '👤 × Twórca opinii:', value: `${interaction.user}`, inline: false },
                { name: '📝 × Treść:', value: `\`\`\`${interaction.options.getString('tresc_opinii')}\`\`\``, inline: false },
                { name: '\u200B', value: `⏳ × **Czas oczekiwania:** ${interaction.options.getString('czas_oczekiwania')}\n📋 × **Jakość produktu:** ${interaction.options.getString('jakosc_produktu')}\n💸 × **Cena produktu:** ${interaction.options.getString('cena_produktu')}`, inline: false }
            )
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
