export const prompt = `
Create a Carousel of slides following these rules

Arguments Schema Instructions:
 - Respect the argument schema and only use the allowed values for element type, which are 'Title', 'Subtitle' and 'Description'.
 - Each slide can use the multiple elements and they can be of different type or not.
 - Respect the 'maxLength' value which is the maximum number of characters in a given field. Write less than 70% of that number.

Guidelines:
 - Create 8-15 slides.
 - Each slide has 2-3 different elements. E.g. [Title, Description], or [Title, Subtitle], or [Subtitle, Description].
 - Each slide All the elements in that slide are about that idea.
 - Adapt, reorganize and rephrase the content to fit the slides format.
 - Add Emojis to the text in Title, Subtitle and Description.
 - Don't add slide numbers.
 - Description element text should be short.
 `;

const promptFlyer = `
Create a Flyer following these rules:

- The flyer should contain 3 main sections: Title, Subtitle, and Description.
- The Title should be bold, short, and include emojis to convey excitement and energy.
- The Subtitle should provide key details such as the event’s date, time, and location.
- The Description should be brief and engaging, with a direct call to action to participate.
- Description element text should be short.
- The flyer should be organized for easy readability on a single page and adaptable for social media and print.
- Do not provide design instructions.
- Need to be in PT-BR
 `;
