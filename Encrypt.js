class Encrypting {
    constructor(cle) {
        this.cle = cle;
    }

    hugoEncrypt(mot) {
        let mot_chiffre = "";
        let index_cle = 0;
        for (let i = 0; i < mot.length; i++) {
            let lettre = mot[i];
            let decalage = this.cle.charCodeAt(index_cle) - 97;
            let lettre_chiffree = String.fromCharCode((lettre.charCodeAt() + decalage - 97) % 26 + 97);
            mot_chiffre += lettre_chiffree;
            index_cle = (index_cle + 1) % this.cle.length;
        }
        return mot_chiffre;
    }

    hugoDecrypt(mot_chiffre) {
        let mot_dechiffre = "";
        let index_cle = 0;
        for (let i = 0; i < mot_chiffre.length; i++) {
            let lettre_chiffree = mot_chiffre[i];
            let decalage = this.cle.charCodeAt(index_cle) - 97;
            let lettre = String.fromCharCode((lettre_chiffree.charCodeAt() - decalage - 97) % 26 + 97);
            mot_dechiffre += lettre;
            index_cle = (index_cle + 1) % this.cle.length;
        }
        return mot_dechiffre;
    }
}

    let cle = "MySecretKey";
/*
    let cm = new Encrypting(cle);
    let word = "123456";

    let encrypt_word = cm.encrypt(word);
    console.log(encrypt_word);  // Encrypted word "avbxll"
    
    let decrypt_word = cm.hugoDecrypt(encrypt_word);
    console.log(decrypt_word);  // Return "123456"
 */