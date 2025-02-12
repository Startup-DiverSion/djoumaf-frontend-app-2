import { Preferences } from "@capacitor/preferences";

export class LocalSotreUtils {
  public set = async (key:string, value: any) => {
    await Preferences.set({
      key,
      value
    });
  };

  public get = async (key:string) => {
    const { value } = await Preferences.get({  key });

    return value
  };

  public remove = async (key:string) => {
    await Preferences.remove({ key });
  };

  public clear = async () => {
    await Preferences.clear();
  };


}
