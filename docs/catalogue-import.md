# Catalogue import

Imported the 17 named paintings from the supplied spreadsheet. File matching ignores capitalization, spaces, punctuation, and accents; `percepcion (2).jpg` matches `percepcion(2)`.

Titles use initial capitals. Measurements preserve the spreadsheet's order, formatted as centimetres. Creation years are integers, or `null` when the source cell is blank. Descriptions retain the supplied Spanish wording and paragraphs. Empty descriptions retain `*Descripcion*` for later completion.

Missing descriptions: Ojo, Florecer y renacer, Memoria, Naturaleza efimera.

Missing years: Ojo, Ruina en movimiento, Transicion, Naturaleza efimera.

Two files have no matching spreadsheet row and are not included in the published catalogue: `IMG-20260929-WA0209.jpeg` and `IMG-20261108-WA0023.jpg`. The original files remain untouched.

Edit `content/artworks.ts` to complete missing information. The first three entries appear on the homepage. Original image pixel dimensions are stored separately from the physical measurements. The 3D textures have been regenerated for the renamed files.
