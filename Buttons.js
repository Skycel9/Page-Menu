const Discord = require("discord.js");
const Buttons = require("discord-buttons");

async function mPage(message, pButtons, pPages)
{
    if (!typeof(pButtons) === "array" || !typeof(pPages) === "array") return console.log("Function settings error!");
    if (!pButtons.length === 2) return console.log("Number's button failed!");
    if (pPages.length <= 0) return console.log("Number's page failed!");

    pButtons[0].setDisabled(true);

    const vRowButtons = new Buttons.MessageActionRow()
        .addComponent(pButtons[0])
        .addComponent(pButtons[1]);

    pPages.forEach(vPageFound=>
    {
        vPageFound.footer.text += ` | Page ${pPages.indexOf(vPageFound) + 1}/${pPages.length}`
    })

    const vPanel = await message.channel.send({embed: pPages[0], component: vRowButtons});

    let vActualPage = 1;

    const vFilterButton = (button) => button.clicker.user.id === message.author.id;
    const vButtonsCollector = vPanel.createButtonCollector(vFilterButton);
    
    vButtonsCollector.on("collect", async button=>
    {
        switch (button.id)
        {
            case "previous":
                if (vActualPage <= 1) return
                button.defer();
                vActualPage = vActualPage - 1;
                if (vActualPage === 1)
                {
                    pButtons[0].setDisabled(true);
                    mEditRow(vRowButtons, pButtons[0], pButtons[1]);

                    vPanel.edit({embed: pPages[vActualPage - 1], component: vRowButtons});

                    pButtons.forEach(btn=> btn.setDisabled(false));
                    mEditRow(vRowButtons, pButtons[0], pButtons[1]);
                }
                else 
                {
                    vPanel.edit({embed: pPages[vActualPage - 1], component: vRowButtons});

                    pButtons.forEach(btn=> btn.setDisabled(false));
                    mEditRow(vRowButtons, pButtons[0], pButtons[1]);
                }
            break;
            case "next":
                if (vActualPage >= pPages.length) return
                button.defer();
                vActualPage = vActualPage + 1;
                if (vActualPage === pPages.length)
                {
                    pButtons[1].setDisabled(true);
                    mEditRow(vRowButtons, pButtons[0], pButtons[1]);

                    vPanel.edit({embed: pPages[vActualPage - 1], component: vRowButtons});

                    pButtons.forEach(btn=> btn.setDisabled(false));
                    mEditRow(vRowButtons, pButtons[0], pButtons[1]);
                }
                else
                {
                    pButtons.forEach(btn=> btn.setDisabled(false));
                    mEditRow(vRowButtons, pButtons[0], pButtons[1]);

                    vPanel.edit({embed: pPages[vActualPage - 1], component: vRowButtons});
                }
            break;
        }
    })
}

function mEditButton(pButton, pStyle, pLabel, pEmoji, pID, pDisabled)
{
    pButton.setStyle(pStyle).setLabel(pLabel).setEmoji(pEmoji).setID(pID).setDisabled(pDisabled);
}
function mEditRow(pRow, ...args)
{
    pRow.components.splice(0, pRow.components.length)
    if (args.length > 5) return;
    args.forEach(arg=>
    {
        pRow.addComponent(arg)
    })
}

module.exports = {
    PageMenu: mPage,
    EditButton: mEditButton,
    EditRow: mEditRow,
}