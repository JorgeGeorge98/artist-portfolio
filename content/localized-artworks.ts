import { artworks } from "@/content/artworks";
import type { Locale } from "@/lib/i18n";

// Individual translations of the descriptions supplied in Obras.xlsx.
const descriptions: Record<string, string> = {
  "Serenidad": "A reflection of the stability reached after a period of change and transition. The bust in profile reveals a passage from movement towards balance and calm.",
  "Florecer y Renacer": "Florecer: An invitation to new experiences and to the creation of a space filled with dreams and ambitions. This work offers a meeting point for inspiration and motivation, where nature and the human figure intertwine.\n\nRenacer: This work reflects the awakening of my inner world and the strength to rise again and rebuild my ambitions and dreams. It emerges from the intention to bring new opportunities to life, leaving insecurities, fears and creative blocks behind.",
  "Percepción": "The way we perceive our surroundings is shaped by our personal experiences. The body adopts a reflective, inward-looking gaze, entering a space filled with emotional memories, where every trace reveals the passage of time and a way of coping with what we have lived through.",
  "Presencia": "A reflection of a state of change and movement in which every experience forms part of my own transformation. The figure’s gesture conveys personal growth, reminding us that time and perseverance are essential on days when strength and energy are harder to find.",
  "Reconocimiento": "A process of inner exploration that invites us to recognise and understand our emotions, establishing a dialogue with ourselves in the search for inner balance and harmony.",
  "Introspección": "A space of change and transformation that emerges in moments of uncertainty and unease. A turning point where mind and soul enter into dialogue, opening the way to a deeper look within ourselves.",
  "Equilibrio": "The search for a middle ground between the rhythm of everyday life and the need to find calm. Through yoga and meditation, we nurture the connection between body and mind, seeking a balance that allows us to stay centred and achieve greater inner stability.",
  "Impulso": "An inner force that awakens the desire to transform what surrounds us. A spontaneous impulse that arises from our emotional world and expresses itself through the body as a need for change.",
  "Memoria": "A representation of all those memories and experiences that leave a mark on our lives. From journeys and moments shared with our family to the people who stand by us through difficult times and the experiences that help us grow. Memories that remain with us, connect us to who we once were and form part of our story.",
  "Entrelazados": "The past, present and future are connected and form part of our story. This work represents the relationship between these three stages and the importance of finding a balance between them: accepting what we have lived through, learning to enjoy the present and looking towards the future without letting uncertainty hold us back.",
  "Reinterpretación de la creación": "A reflection on the bond between the divine and the human, and on our connection to a force beyond ourselves. A search born of the need to find meaning, guidance and something to hold on to amid life’s uncertainties and difficulties.",
  "Ruina en movimiento": "The ruin represents the trace of what once was and, in some way, remains within us. The experiences we live through transform us and leave a mark on our personal history, shaping who we are and how we understand the world.",
  "Transición": "A process of personal transformation shaped by experiences, difficulties and the ability to keep going. A period in which pain, fatigue and exhaustion were present, but did not prevent progress. Learning to live with difficulties, move beyond our own limits and find new ways to continue.",
  "Mirada interior": "An invitation to look within, recognise what we need to change or improve and better understand what we feel. A personal process in which we learn to heal wounds, forgive and leave behind what continues to affect us, so that we can feel more at ease with ourselves and find a little more peace.",
  "Portal al alma": "A connection with our essence and our most sensitive side, with what defines us and makes us unique. An invitation to discover and accept who we are, beyond the expectations and opinions of others. Recognising our authenticity and valuing what sets us apart.",
  "Umbral": "Our gaze influences the way we see, interpret and understand our surroundings. Each person perceives the same situation differently, according to their experiences and the way they feel. This work invites us to reflect on how our way of looking can change the way we live and make sense of things.",
  "Naturaleza efímera": "Nature offers us a space to step away from the rhythm of everyday life and reconnect with ourselves. Through its forms, colours and sensations, it awakens our most sensitive side and brings us closer to what we sometimes set aside: our emotions and our essence.",
  "Visión": "Our gaze connects us to the world around us, to people and to the experiences that form part of our lives. The way we perceive what happens influences how we understand, accept and experience it. The attitude we bring to each situation can change our perspective, helping us remain hopeful in the face of difficulties and keep moving forward without losing sight of what truly matters.",
  "Diálogo entre miradas": "Throughout life, we pass through different stages that leave a mark on who we are. This work represents the meeting of different versions of ourselves and how they relate through our experiences. This connection also brings us closer to nature and to everything that awakens our sensitivity, offers us calm and helps us recognise who we are beyond what we have lived through.",
  "Armonía": "The search for a space of calm where we can step away from outside noise and the thoughts that accompany us from day to day. A place to pause, connect with ourselves and find the tranquillity that allows us to feel in tune with who we are.",
  "Entre pétalos": "Being surrounded by nature allows us to disconnect from the rhythm of everyday life and connect with our senses. The colours, shapes and scents of flowers awaken our sensitivity and carry us into a different space, where we can set our worries aside and enjoy what surrounds us.",
  "Viaje onírico": "A connection with our most natural and sensitive side, where we can show ourselves as we are, without masks or pretence. The naked body represents that vulnerability and the freedom to leave behind the fears and experiences that have shaped us. Nature brings us closer to our most authentic selves, where we can connect with what we feel and who we truly are."
};
const englishArtworks = artworks.map(artwork => ({
  ...artwork,
  description: descriptions[artwork.title] ?? artwork.description,
  dimensions: artwork.dimensions.replace("cada obra", "each artwork"),
  priceNote: artwork.priceNote === "por obra" ? "per artwork" : artwork.priceNote,
  alt: `${artwork.title}, painting by Daniela Salem.`,
}));
export function getArtworks(locale: Locale) {
  return locale === "en" ? englishArtworks : artworks;
}
