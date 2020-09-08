export class ApiErrorTranslation {
  static translation: any = {
    ERROR: 'Es ist ein unbekannter Fehler aufgetreten. Bitte versuche es später erneut.',
    UNAUTHENTICATED: 'Du bist derzeit nicht angemeldet. Bitte start die App neu, um dich erneut anzumelden.',
    INVALID_TOKEN: 'Du bist derzeit nicht angemeldet. Bitte start die App neu, um dich erneut anzumelden.',
    VALIDATION_ERROR: 'Die eingegebenen Daten sind falsch bzw. nicht gültig. Bitte überprüfe deine Eingabe erneut.',
    EMAIL_EXISTS: 'Diese E-Mail-Adresse ist bereits bei JetDriver registriert.',
    LOGIN_FAILED: 'Die E-Mail-Adresse oder das Passwort ist falsch.',
    CAR_NOT_FOUND: 'Dieses Auto konnte nicht gefunden werden.',
    COMPANION_NOT_FOUND: 'Diese Begleitperson konnte nicht gefunden werden.',
    ENTRY_NOT_FOUND: 'Dieser Eintrag konnte nicht gefunden werden.',
    PROPERTY_NOT_AVAILABLE: 'Diese Eigenschaft ist nicht verfügbar.',
  };

  static get(error: string) {
    const message = this.translation[error];
    return message ? message : this.translation['ERROR'];
  }
}
