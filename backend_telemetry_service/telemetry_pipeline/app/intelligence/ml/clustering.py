from collections import defaultdict


class ErrorClusterer:

    def cluster(self, errors):

        clusters = defaultdict(list)

        for e in errors:
            key = f"{e.exception_type}:{e.message[:50]}"
            clusters[key].append(e)

        return clusters