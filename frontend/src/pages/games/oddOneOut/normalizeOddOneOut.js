export function normalizeOddOneThemes(themes) {
  return themes.map(theme => ({
    ...theme,
    levels: theme.levels.map(level => ({
      ...level,
      gridSize: level.normal.length + 1,
    })),
  }));
}