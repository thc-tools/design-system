// Libs

// Component
import { Icon, ICONS } from "../Icon";

export default {
    title: "Design System/Molecules/Icons/Icons",
    component: Icon,
    args: {
        children: "globe",
    },
    parameters: {
        docs: {
            description: {
                component: `
\`\`\`js
import { Icon } from "@ds-tools/design-system/molecules/icons"
\`\`\`

Pour ajouter une icône il y'a deux possibilités :
- Une icône simple façon les petites icônes (95% des cas)
- Une icône plus complexe façon logo d'une marque

Il y'a quelques contraintes  à respecter :
- L'icône doit exister en 16x16
- Elle ne doit contenir que des balises path
- Exister dans le Figma du projet

Ajouter l'icône :
- On exporte à partir de Figma l'icône
- On la mets dans le dossier raw-icons 
- On exécute le script npm "build:assets:icon"

Pour les icônes complexe on importera le svg en mode ReactElement :
\`\`\`
export { ReactElement as DeliverooIcon } from "./deliveroo.svg";
\`\`\`
                `,
            },
        },
    },
};

const Template = (args) => <Icon {...args} />;

export const Primary = Template.bind({});

export function Icons() {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "30px" }}>
            {ICONS.map((icon) => (
                <div key={icon}>
                    <Icon>{icon}</Icon>
                    <div>{icon}</div>
                </div>
            ))}
        </div>
    );
}
Icons.parameters = {
    controls: { disabled: true },
};
