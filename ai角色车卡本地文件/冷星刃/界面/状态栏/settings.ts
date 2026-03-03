const Settings = z
  .object({
    show_leng_xingren: z.boolean().default(true),
    show_protagonist: z.boolean().default(false),
    show_world: z.boolean().default(true),
    })
  .prefault({});

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref(Settings.parse(getVariables({ type: 'script', script_id: getScriptId() })));
  
  watchEffect(() => {
    insertOrAssignVariables(klona(settings.value), { type: 'script', script_id: getScriptId() });
  });
  
  return { settings };
});
