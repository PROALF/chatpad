import {
  Badge,
  Button,
  Center,
  Container,
  Group,
  SimpleGrid,
  Text,
  ThemeIcon,
} from "@mantine/core";
import {
  IconCloudDownload,
  IconCurrencyDollar,
  IconKey,
  IconLock,
  IconNorthStar,
} from "@tabler/icons-react";
import { useLiveQuery } from "dexie-react-hooks";
import { Logo } from "../components/Logo";
import { SettingsModal } from "../components/SettingsModal";
import { db } from "../db";
import { config } from "../utils/config";

export function IndexRoute() {
  const settings = useLiveQuery(() => db.settings.get("general"));
  const { openAiApiKey } = settings ?? {};

  return (
    <>
      <Center py="xl" sx={{ height: "100%" }}>
        <Container size="sm">
          <Badge mb="lg">Einfach.Alex</Badge>
          <Text>
            <Logo style={{ maxWidth: 100 }} />
          </Text>
          <Text mt={4} size="xl">
            Das AllInOne GPT4 Interface - Test it Out
          </Text>
          <SimpleGrid
            mt={50}
            cols={3}
            spacing={30}
            breakpoints={[{ maxWidth: "md", cols: 1 }]}
          >
            {features.map((feature) => (
              <div key={feature.title}>
                <ThemeIcon variant="outline" size={50} radius={50}>
                  <feature.icon size={26} stroke={1.5} />
                </ThemeIcon>
                <Text mt="sm" mb={7}>
                  {feature.title}
                </Text>
                <Text size="sm" color="dimmed" sx={{ lineHeight: 1.6 }}>
                  {feature.description}
                </Text>
              </div>
            ))}
          </SimpleGrid>
          <Group mt={50}>
            {config.allowSettingsModal && (
              <SettingsModal>
                <Button
                  size="md"
                  variant={openAiApiKey ? "light" : "filled"}
                  leftIcon={<IconKey size={20} />}
                >
                  {openAiApiKey ? "Change OpenAI Key" : "Enter OpenAI Key"}
                </Button>
              </SettingsModal>
            )}
            {config.showDownloadLink && !window.todesktop && (
              <Button
                component="a"
                href="https://einfachalex.net"
                // href="https://einfachalex.net"
                size="md"
                variant="outline"
                leftIcon={<IconCloudDownload size={20} />}
              >
                Demnächst auch als Download
              </Button>
            )}
          </Group>
        </Container>
      </Center>
    </>
  );
}

const features = [
  {
    icon: IconCurrencyDollar,
    title: "Frei und quelloffen",
    description:
      "Diese App wird kostenlos zur Verfügung gestellt und der Quellcode ist auf GitHub verfügbar.",
  },
  {
    icon: IconLock,
    title: "Privacy focused",
    description:
      "Kein Tracking, keine Cookies, kein Quatsch. Alle Ihre Daten werden lokal gespeichert.",
  },
  {
    icon: IconNorthStar,
    title: "Beste Erfahrung",
    description:
      "Mit Liebe und Sorgfalt hergestellt, um das bestmögliche Erlebnis zu bieten.",
  },
];
