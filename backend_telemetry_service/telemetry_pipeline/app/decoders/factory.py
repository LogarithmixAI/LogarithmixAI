from app.decoders.v1_decoder import V1Decoder


class DecoderFactory:

    def get_decoder(self, version: str):

        if version.startswith("1."):
            return V1Decoder()

        # default fallback
        return V1Decoder()