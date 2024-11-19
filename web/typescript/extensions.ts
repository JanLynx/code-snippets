export class Extensions {

  public static compareObj(objA: any, objB: any): boolean {
    if (objA === objB) {
        return true;
    }

    // Wenn einer von beiden kein Objekt oder null ist
    if (typeof objA !== 'object' || objA === null ||
        typeof objB !== 'object' || objB === null) {
        return false;
    }

    // Schlüssel von beiden Objekten holen
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    // Wenn die Anzahl der Schlüssel unterschiedlich ist
    if (keysA.length !== keysB.length) {
        return false;
    }

    // Schlüssel sortieren, um die Reihenfolge zu ignorieren
    keysA.sort();
    keysB.sort();

    // Überprüfen, ob alle Schlüssel identisch sind
    for (let i = 0; i < keysA.length; i++) {
        if (keysA[i] !== keysB[i]) {
            return false;
        }
    }

    // Werte der Schlüssel vergleichen
    for (let key of keysA) {
        const valA = objA[key];
        const valB = objB[key];

        const areObjects = typeof valA === 'object' && valA !== null &&
                           typeof valB === 'object' && valB !== null;

        if (areObjects) {
            // Rekursiver Vergleich für verschachtelte Objekte
            if (!this.compareObj(valA, valB)) {
                return false;
            }
        } else {
            // Vergleich der Werte
            if (valA !== valB) {
                return false;
            }
        }
    }

    // Alle Tests bestanden, Objekte sind gleich
    return true;
  }
}
